// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {Ownable2StepUpgradeable} from "@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol";
import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {ILiquidityPool} from "./interfaces/ILiquidityPool.sol";
import {IPriceFeed} from "./interfaces/IPriceFeed.sol";


// CHECK LIQPRICE
// ADD EVENTS
// NATSPEC

contract Futures is UUPSUpgradeable, Ownable2StepUpgradeable {
    using SafeERC20 for IERC20;

    error Futures__FutureAlreadyExists();
    error Futures__FutureDoesNotExists();

    ILiquidityPool public liquidityPool;

    IERC20 public USDC;
    uint256 public positionIdCounter;
    IPriceFeed public priceFeed;
    address public governance;
    address public wbtc;
    address public weth;

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
    }

    uint256 public counter;
    mapping(uint256 => FutureInfo) public futureMarket;
    mapping(string => uint256) public futureId;

    mapping(uint256 => mapping(address => Position)) public longPositions;
    mapping(uint256 => mapping(address => Position)) public shortPositions;

    uint256 private usdcOut;
    uint256 private fromLiquidityPool;
    uint256 private fromCollateral;
    uint256 private newLeverage;
    uint256 private leverage;
    uint256 private leverageToReturn;
    uint256 private currentSize;

    uint256 public makerTradingFee;
    uint256 public takerTradingFee;
    uint256 public priceImpactFee;
    uint256 public fundingFee;
    uint256 public borrowingFee;
    uint256 public executionFee;
    uint256 public constant BASIS_POINTS = 10000;
    uint256 public liquidationThreshold;

    modifier onlyGov() {
        require(msg.sender == governance);
        _;
    }

    constructor() {
        _disableInitializers();
    }

    function initialize(
        address _liquidityPool,
        address _priceFeed,
        address _usdc,
        address _weth,
        address _wbtc,
        uint256 _liquidationThreshold
    ) external initializer {
        __UUPSUpgradeable_init();
        __Ownable2Step_init();
        _transferOwnership(msg.sender);

        weth = _weth;
        wbtc = _wbtc;
        liquidityPool = ILiquidityPool(_liquidityPool);
        priceFeed = IPriceFeed(_priceFeed);
        USDC = IERC20(_usdc);
        liquidationThreshold = _liquidationThreshold;
        governance = msg.sender;
    }

    /*###############################################################################################################################
    #######################################################                    ######################################################
    ######################################################    CORE FUNCTIONS    #####################################################
    #######################################################                    ######################################################
    ###############################################################################################################################*/

    function createFuture(
        string memory _market
    ) external onlyOwner {
        if (futureId[_market] != 0) {
            revert Futures__FutureAlreadyExists();
        }
        ++counter;
        futureMarket[counter] = FutureInfo({market: _market});
        futureId[_market] = counter;
    }

    function calcLiquidationPrice(
        Position memory _position
    ) public view returns (uint256 liqPrice) {
        uint256 leverage = _position.size - _position.collateral;
        uint256 tokenAmount = ((_position.size * 1e12) / _position.entryPrice) /
            1e6;
        liqPrice = ((((leverage * 1e12) / tokenAmount) * liquidationThreshold) / BASIS_POINTS) / 1e6;
    }

    function increasePosition(
        uint256 _futureId,
        uint256 _size,
        uint256 _collateral,
        uint256 _currentPrice,
        bool _long
    ) external {
        if (!validFuture(_futureId)) revert Futures__FutureDoesNotExists();
        // require(priceFeed.isAcceptablePrice(_futureId, _currentPrice));

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
                require(position.long);
                position.entryPrice =
                    ((position.entryPrice * position.size) +
                        (_currentPrice * _size)) /
                    (position.size + _size);
                position.startedAt =
                    ((position.startedAt * position.size) +
                        (block.timestamp * _size)) /
                    (position.size + _size);
                position.collateral += _collateral;
                position.size = position.size + _size;
                position.liqPrice = calcLiquidationPrice(position);
                require(_currentPrice > position.liqPrice);
            }
            require(position.size / position.collateral <= 50);
            longPositions[_futureId][msg.sender] = position;
        } else {
            revert();
        }
    }

    function increaseCollateral(
        uint256 _futureId,
        uint256 _collateral,
        uint256 _currentPrice,
        bool _long
    ) external {
        // if (!validFuture(_futureId)) revert Futures__FutureDoesNotExists();
        // require(priceFeed.isAcceptablePrice(_futureId, _currentPrice));

        // USDC.safeTransferFrom(msg.sender, address(this), _collateral);
        // liquidityPool.blockLiquidity(_collateral * 9);

        // if (_long) {
        //     Position memory position = longPositions[_futureId][msg.sender];
        //     require(position.long);
        //     require(position.size != 0);
        //     position.entryPrice =
        //         ((position.entryPrice * position.size) +
        //             (_currentPrice * _collateral)) /
        //         (position.size + _collateral);
        //     position.size += _collateral;
        //     position.collateral += _collateral;
        //     position.liqPrice = calcLiquidationPrice(position);
        //     require(_currentPrice > position.liqPrice);
        //     longPositions[_futureId][msg.sender] = position;
        // } else {
        //     revert();
        // }
    }

    // NUEVA DECREASE POSITION FUNCTION
    function decreasePosition(
        uint256 _futureId,
        uint256 _percentageDecrease, // percentage with 2 decimals (0-10000);
        uint256 _currentPrice,
        bool _keepLeverageRatio,
        bool _long
    ) external {
        if (!validFuture(_futureId)) revert Futures__FutureDoesNotExists();
        // require(priceFeed.isAcceptablePrice(_futureId, _currentPrice));

        _keepLeverageRatio = true; // will be used in the future for users to decide (now always true)

        if (_long) {
            Position memory position = longPositions[_futureId][msg.sender];
            require(position.long);
            require(position.size != 0);
            
            if (_keepLeverageRatio) {
                // convert current size to function public with address and long bool or the position
                currentSize = (_currentPrice * position.size) /
                    position.entryPrice;
                leverage = position.size - position.collateral;
                leverageToReturn = (leverage * _percentageDecrease) /
                    (100 * 100); // /100
                if (leverageToReturn < leverage) {
                    position.size -= leverageToReturn;
                    usdcOut =
                        (currentSize * _percentageDecrease) /
                        BASIS_POINTS -
                        leverageToReturn;
                    uint256 collateralToDecrease = (position.collateral *
                        _percentageDecrease) / BASIS_POINTS;
                    position.collateral -= collateralToDecrease;
                    position.size -= collateralToDecrease;
                    if (usdcOut > collateralToDecrease) {
                        fromLiquidityPool = usdcOut - collateralToDecrease;
                    } else {
                        fromLiquidityPool = 0;
                    }
                    fromCollateral = collateralToDecrease;
                    newLeverage = position.size - position.collateral;
                    uint256 tokenAmount = ((position.size * 1e12) /
                        position.entryPrice) / 1e6;
                    position.liqPrice =
                        ((((newLeverage * 1e12) / tokenAmount) * liquidationThreshold) /
                            BASIS_POINTS) /
                        1e6;
                    require(_currentPrice > position.liqPrice);
                    longPositions[_futureId][msg.sender] = position;
                    if (collateralToDecrease < usdcOut) {
                        USDC.safeTransfer(msg.sender, collateralToDecrease);
                    } else {
                        USDC.safeTransfer(msg.sender, usdcOut);
                    }
                    liquidityPool.benefitsToTrader(
                        msg.sender,
                        fromLiquidityPool
                    );
                    liquidityPool.unblockLiquidity(collateralToDecrease * 9 - fromLiquidityPool);
                } else {
                    usdcOut =
                        (currentSize * _percentageDecrease) /
                        BASIS_POINTS -
                        leverage;
                    if (usdcOut > position.collateral){
                        fromLiquidityPool = usdcOut - position.collateral;
                        fromCollateral = position.collateral;
                        liquidityPool.unblockLiquidity(position.collateral * 9 - fromLiquidityPool);
                        delete longPositions[_futureId][msg.sender];
                        liquidityPool.benefitsToTrader(
                            msg.sender,
                            fromLiquidityPool
                        );
                        USDC.safeTransfer(msg.sender, fromCollateral);
                    } else {
                        fromCollateral = usdcOut;
                        liquidityPool.unblockLiquidity(position.collateral * 9);
                        delete longPositions[_futureId][msg.sender];
                        USDC.safeTransfer(msg.sender, fromCollateral);
                    }
                }
            } else {
                revert(); // modify ratio not yet available
            }
        } else {    
            revert(); // shorts not yet available
        }
    }

    // NEW FUNCTION
    function decreaseCollateral(
        uint256 _futureId,
        uint256 _percentageDecrease,
        uint256 _currentPrice,
        bool _long
    ) external {
        // if (!validFuture(_futureId)) revert Futures__FutureDoesNotExists();
        // require(priceFeed.isAcceptablePrice(_futureId, _currentPrice));
        // uint256 collateralOut;

        // if (_long) {
        //     Position memory position = longPositions[_futureId][msg.sender];
        //     require(position.long);
        //     require(position.size != 0);

        //     collateralOut = (position.collateral * _percentageDecrease) / 10000;
        //     position.collateral -= collateralOut;
        //     position.size -= collateralOut;
        //     uint256 leverage = position.size - position.collateral;
        //     uint256 tokenAmount = ((position.size * 1e12) /
        //         position.entryPrice) / 1e6;
        //     position.liqPrice =
        //         ((((leverage * 1e12) / tokenAmount) * liquidationThreshold) / 10000) /
        //         1e6;
        //     USDC.safeTransfer(msg.sender, collateralOut);
        //     liquidityPool.unblockLiquidity(collateralOut * 9);
        //     longPositions[_futureId][msg.sender] = position;
        // } else {
        //     revert(); // shorts not yet available
        // }
    }

    // function to liquidate positions
    // Note that _currentPrice param will be deleted as will be obtained through the priceFeed
    function liquidatePosition(
        uint256 _futureId,
        address _trader,
        bool _long
    ) external {
        uint256 rest;
        // Improve efficiency for calls to priceFeed
        if (_long) {
            Position memory position = longPositions[_futureId][_trader];
            require(position.long);
            require(position.size != 0);
            uint256 currentPrice;
            if (position.marketId == 1) {
                currentPrice = priceFeed.mockGetUsdPriceFromChainlink(wbtc);
            } else {
                currentPrice = priceFeed.mockGetUsdPriceFromChainlink(weth);
            }
            if (IsPositionLiquidable(position, currentPrice)) {
                currentSize = (currentPrice * position.size) / position.entryPrice;
                leverage = position.size - position.collateral;
                if (currentSize > leverage) usdcOut = currentSize - leverage;
                else usdcOut = 0;
                fromCollateral = usdcOut;
                liquidityPool.unblockLiquidity(position.collateral * 9);
                delete longPositions[_futureId][_trader];
                USDC.safeTransfer(_trader, fromCollateral);
                USDC.safeTransfer(address(liquidityPool), position.collateral - fromCollateral);
            } else {
                revert();
            }
        } else {
            revert(); // shorts not yet available
        }
    }

    /*###############################################################################################################################
    #######################################################                    ######################################################
    ######################################################       HELPERS        #####################################################
    #######################################################                    ######################################################
    ###############################################################################################################################*/

    function IsPositionLiquidable(
        Position memory _position, uint256 _currentPrice
    ) public view returns (bool) {
        if (_position.long) {
            return (_position.liqPrice > _currentPrice);
            // return (_position.liqPrice > priceFeed.getUsdPriceFromChainlink());
        } else {
            revert();   // shorts not yet available
            // return (_position.liqPrice > priceFeed.getPrice(_position.marketId));
        }
    }

    function positionNetValue (uint256 _price, address _trader, bool _long, uint256 _futureId) public view returns (uint256 positionNetValue){
        if (_long) {
            Position memory position = longPositions[_futureId][_trader];
            if (position.collateral == 0) {
                return (positionNetValue);
            }
            uint256 newSize = (_price * position.size) / position.entryPrice;
            uint256 leverage = (position.size - position.collateral);
            if (newSize > leverage) {
                positionNetValue = newSize - leverage;
            }
            return positionNetValue;
        } else {
            revert(); // shorts not yet available
        }
    }

    /*###############################################################################################################################
    #######################################################                     #####################################################
    ######################################################    OTHER FUNCTIONS    ####################################################
    #######################################################                     #####################################################
    ###############################################################################################################################*/

    // function stopLossOrder() external {}

    // function takeProfitOrder() external {}

    function validFuture(uint256 _futureId) public view returns (bool) {
        return (_futureId != 0 && _futureId <= counter);
    }

    function setGovernance(address _newGovernance) external onlyGov {
        governance = _newGovernance;
    }

    function setTradingFees(
        uint256 _makerFee,
        uint256 _takerFee
    ) external onlyGov {
        makerTradingFee = _makerFee;
        takerTradingFee = _takerFee;
    }

    function setpriceImpactFee(uint256 _priceImpactFee) external onlyGov {
        priceImpactFee = _priceImpactFee;
    }

    function setfundingFee(uint256 _fundingFee) external onlyGov {
        fundingFee = _fundingFee;
    }

    function setborrowingFee(uint256 _borrowingFee) external onlyGov {
        borrowingFee = _borrowingFee;
    }

    function setexecutionFee(uint256 _executionFee) external onlyGov {
        executionFee = _executionFee;
    }

    function getTraderPosition(
        uint256 _futureId,
        address _user,
        bool _long
    )
        public
        view
        returns (
            uint256 startedAt,
            uint256 size,
            uint256 collateral,
            uint256 entryPrice,
            uint256 liqPrice,
            bool long,
            uint256 marketId
        )
    {
        Position memory position;
        if (_long) {
            position = longPositions[_futureId][_user];
        } else {
            position = shortPositions[_futureId][_user];
        }
        return (
            position.startedAt,
            position.size,
            position.collateral,
            position.entryPrice,
            position.liqPrice,
            position.long,
            position.marketId
        );
    }

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