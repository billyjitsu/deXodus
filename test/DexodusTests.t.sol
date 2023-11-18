// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {DeployProtocol} from "../../script/DeployProtocol.s.sol";
import {HelperConfig} from "../../script/HelperConfig.s.sol";
import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Futures} from "../../src/Futures.sol";
import {LiquidityPool} from "../../src/LiquidityPool.sol";
import {console, Test} from "forge-std/Test.sol";
import {LiquidityPool} from "../../src/LiquidityPool.sol";

contract FuturesTest is Test {
    address public owner;
    address public alice;
    address public bobby;
    address public carla;
    address public edgar;
    address public liqPr1;
    address public liqPr2;
    address public liqPr3;

    uint256 deployerKey;

    Futures public futures;
    LiquidityPool public liquidityPool;

    address public futuresAddr;
    address public liquidityPoolAddr;

    address wbtcAddr;
    address wethAddr;
    address usdcAddr;

    IERC20 wbtc;
    IERC20 weth;
    IERC20 usdc;

    HelperConfig helperConfig;

    /*##############################################################################################################################
    #######################################################                   ######################################################
    ######################################################        SETUP        #####################################################
    #######################################################                   ######################################################
    ##############################################################################################################################*/

    function setUp() external {
        alice = vm.addr(0xAA);
        bobby = vm.addr(0xAB);
        carla = vm.addr(0xAE);
        edgar = vm.addr(0xEA);

        liqPr1 = vm.addr(0x1AA);
        liqPr2 = vm.addr(0x1AB);
        liqPr3 = vm.addr(0x1EE);

        // vm.startPrank(owner);
        DeployProtocol deployer = new DeployProtocol();
        (futuresAddr, liquidityPoolAddr, usdcAddr, helperConfig) = deployer
            .run();

        (wethAddr, wbtcAddr, deployerKey) = helperConfig.activeNetworkConfig();

        usdc = IERC20(usdcAddr);
        owner = vm.addr(vm.envUint("PRIVATE_KEY"));

        vm.startPrank(owner);

        deal(usdcAddr, alice, 10_000e6);
        deal(usdcAddr, bobby, 1_000e6);
        deal(usdcAddr, carla, 1_000e6);
        deal(usdcAddr, edgar, 1_000e6);

        deal(usdcAddr, owner, 100_000e6);
        deal(usdcAddr, liqPr1, 100_000e6);
        deal(usdcAddr, liqPr2, 100_000e6);
        deal(usdcAddr, liqPr3, 100_000e6);

        liquidityPool = LiquidityPool(liquidityPoolAddr);
        futures = Futures(futuresAddr);
        vm.stopPrank();

        vm.startPrank(owner);
        IERC20(usdc).approve(liquidityPoolAddr, usdc.balanceOf(owner));
        // liquidityPool.addLiquidity(owner, 100_000e6);
        // console.log(liquidityPool.balanceOf(owner));
        vm.stopPrank();

        vm.label(owner, "Owner");
        vm.label(alice, "Alice");
        vm.label(bobby, "Bobby");
        vm.label(carla, "Carla");
        vm.label(edgar, "Edgar");
        vm.label(liqPr1, "Liquidity Provider 1");
        vm.label(liqPr2, "Liquidity Provider 2");
        vm.label(liqPr3, "Liquidity Provider 3");
        vm.label(futuresAddr, "Futures");
        vm.label(liquidityPoolAddr, "Liquidity Pool");
    }

    /*##############################################################################################################################
    #######################################################                   ######################################################
    ######################################################        TESTS        #####################################################
    #######################################################                   ######################################################
    ##############################################################################################################################*/

    // user can provide liquidity
    function test001() public {
        vm.startPrank(liqPr1);
        IERC20(usdc).approve(liquidityPoolAddr, usdc.balanceOf(liqPr1));
        console.log("usdc -----> ", address(usdc));
        liquidityPool.addLiquidity(liqPr1, 10_000e6);
        vm.stopPrank();
    }

    // total supply and LP balance for user is calculated as expected
    function test002() public {
        vm.startPrank(liqPr1);
        IERC20(usdc).approve(liquidityPoolAddr, usdc.balanceOf(liqPr1));
        liquidityPool.addLiquidity(liqPr1, 100_000e6);
        vm.stopPrank();
        uint256 balanceLiqPr = liquidityPool.balanceOf(liqPr1);
        uint256 totalSupply = liquidityPool.totalSupply();
        assertEq(balanceLiqPr, (100_000e6 * 10 * 1e18) / 1e6);
        assertEq(balanceLiqPr, totalSupply);
    }

    // withdraw liquidity
    function test003() public {
        vm.startPrank(liqPr1);
        IERC20(usdc).approve(liquidityPoolAddr, usdc.balanceOf(liqPr1));
        uint256 firstUsdcAmount = usdc.balanceOf(liqPr1);
        uint256 amountIn = 100_000e6;
        liquidityPool.addLiquidity(liqPr1, amountIn);
        liquidityPool.withdrawLiquidity(
            liqPr1,
            liquidityPool.balanceOf(liqPr1)
        );
        assertEq(liquidityPool.totalSupply(), 0);
        assertEq(usdc.balanceOf(liqPr1), firstUsdcAmount);
        vm.stopPrank();
    }

}