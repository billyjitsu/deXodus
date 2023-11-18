// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {Ownable2StepUpgradeable} from "@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol";
import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

import {console} from "../lib/hardhat/packages/hardhat-core/console.sol";

/* MAIN FUNCTIONALITY:
     - Liquidity providers add liquidity
     - Liq Providers rmv liquidity
     - Function with futures access control to send usdc to the user if wining the trade
     - Is earning rewards from the traders that lose money
     - Add fee?????
*/

contract LiquidityPool is UUPSUpgradeable, ERC20Upgradeable, Ownable2StepUpgradeable {
    using SafeERC20 for IERC20;

    IERC20 public USDC;

    constructor() {
        _disableInitializers();
    }

    function initialize(
        address _usdc,
        string memory _name,
        string memory _symbol) external initializer {
        __UUPSUpgradeable_init();
        __Ownable2Step_init();
        __ERC20_init(_name, _symbol);
        _transferOwnership(msg.sender);

        USDC = IERC20(_usdc);
    }

    function addLiquidity(address _to, uint256 _amountIn) external {
        uint256 lpAmountOut = calcLpOut(_amountIn);
        console.log("USDC --> ", address(USDC));
        USDC.transferFrom(msg.sender, address(this), _amountIn);
        _mint(_to, lpAmountOut);
    }

    // see if there's any liquidity blocked
    function withdrawLiquidity(address _to, uint256 _amount) external {
        uint256 liquidityOut = calcUsdcOut(_amount);
        _burn(msg.sender, _amount);
        USDC.safeTransfer(_to, liquidityOut);
    }

    // access control to the futures contract
    function blockLiquidity() external {

    }

    // only futures
    function unblockLiquidity() external {

    }


    //////////////////////////////////////////
    // HELPERS
    //////////////////////////////////////////

    function calcLpOut(uint256 amountIn) public returns (uint256 lpOut) {
        if (totalSupply() == 0) {
            lpOut = (amountIn * 10 * 1e18) / 1e6;
        } else {
            uint256 price = (totalSupply() * 1e6) /
                USDC.balanceOf(address(this));
            lpOut = (amountIn * price) / 1e6 - 1;
        }
        return lpOut;
    }

    function calcUsdcOut(
        uint256 amount
    ) public view returns (uint256 liquidityOut) {
        liquidityOut = (USDC.balanceOf(address(this)) * amount) / totalSupply();
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
