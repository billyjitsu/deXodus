// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {Ownable2StepUpgradeable} from "@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol";
import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {ILiquidityPool} from "./interfaces/ILiquidityPool.sol";

contract Futures is UUPSUpgradeable, Ownable2StepUpgradeable {
    using SafeERC20 for IERC20;

    error Futures__FutureAlreadyExists();

    ILiquidityPool public liquidityPool;

    IERC20 public USDC;
    uint256 public positionIdCounter;

    struct Position {
        uint256 positionId;
        uint256 startedAt;
        uint256 size;
        uint256 collateral;
        uint256 entryPrice;
        uint256 liqPrice;
        bool long;
        uint256 marketId;
    }

    struct FutureInfo {
        string market;
        //address underlyingAsset; change all the logic adding underlying asset to the deployment of the contract and the logic for priceFeed (????)
    }

    uint256 public counter;
    mapping(uint256 => FutureInfo) public futureMarket;
    mapping(string => uint256) public futureId;

    mapping(uint256 => mapping(address => Position)) public longPositions; // rethink how to manage this to have one long and one short
    mapping(uint256 => mapping(address => Position)) public shortPositions;

    uint256 public makerTradingFee;
    uint256 public takerTradingFee;
    uint256 public priceImpactFee;
    uint256 public fundingFee;
    uint256 public borrowingFee;
    uint256 public executionFee;
    uint256 public constant BASIS_POINTS = 10000;
    uint256 public liquidationThreshold;

    constructor() {
        _disableInitializers();
    }

    function initialize(address _liquidityPool, address _usdc) external initializer {
        __UUPSUpgradeable_init();
        __Ownable2Step_init();
        _transferOwnership(msg.sender);

        liquidityPool = ILiquidityPool(_liquidityPool);
        USDC = IERC20(_usdc);
    }

    function createFuture(string memory _market) external onlyOwner {
        if (futureId[_market] != 0) {
            revert Futures__FutureAlreadyExists();
        }
        ++counter;
        futureMarket[counter] = FutureInfo({market: _market});
        futureId[_market] = counter;
    }

    function increasePosition(
        uint256 _futureId,
        uint256 _size,
        uint256 _collateral,
        uint256 _currentPrice,
        bool _long
    ) external whenNotPaused {
        USDC.safeTransferFrom(msg.sender, address(this), _collateral);
        liquidityPool.blockLiquidity(_collateral * 9);

        if (_long) {
            Position memory position = longPositions[_futureId][msg.sender];
            if (position.size == 0) {
                position.startedAt = block.timestamp;
                position.size = _size;
                position.collateral = _collateral;
                position.entryPrice = _currentPrice;
                position.liqPrice = calcLiquidationPrice(position);
                position.long = _long;
                position.marketId = _futureId;
                position.positionId = positionIdCounter;
                positionIdCounter++;
            } else { 
            }
        } else {
        }
    }

    function increaseCollateral(
        uint256 _futureId,
        uint256 _collateral,
        uint256 _currentPrice,
        bool _long
    ) external whenNotPaused {
        USDC.safeTransferFrom(msg.sender, address(this), _collateral);
        liquidityPool.blockLiquidity(_collateral * 9);

        if (_long) {
            Position memory position = longPositions[_futureId][msg.sender];
            require(position.long);
            require(position.size != 0);
            position.entryPrice =
                ((position.entryPrice * position.size) +
                    (_currentPrice * _collateral)) /
                (position.size + _collateral);  // recalculate this and do liqPrice
        } else {}
    }

    function decreasePosition() external {
        
    }

    function decreaseCollateral() external {

    }

    function liquidatePosition() external {

    }
        //////////////////////////////////////////
    // UPGRADABILITY
    //////////////////////////////////////////

    function version() external pure returns (uint256) {
        return 1;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal virtual override onlyOwner {}

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[50] private __gap;
}