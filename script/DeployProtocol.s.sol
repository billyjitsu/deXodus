// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {Futures} from "../src/Futures.sol";
import {LiquidityPool} from "../src/LiquidityPool.sol";
import {MockUSDC} from "../src/mocks/MockUSDC.sol";
import {DXD} from "../src/DXD.sol";
import {PriceFeed} from "../src/PriceFeed.sol";
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

    /*
    STEPS FOR UPDATE DEPLOYENT SCRIPT:
    - MAKE THE _DEPLOY FUNCTION OF THE GIVEN CONTRACT
        - DECLARE CONTRACT VARIABLE
        - DECLARE ADDR
    */

contract DeployProtocol is Script {
    address[] public tokens;
    address[] public priceFeed;

    address weth;
    address wbtc;
    address usdc;
    uint256 deployerKey;

    address wethUsdPriceFeed;
    address wbtcUsdPriceFeed;

    function run() external returns (
        address futuresAddr,
        address liquidityPoolAddr,
        address mockUsdcAddr,
        HelperConfig helperConfig,
        address dxdAddr,
        address priceFeedAddr
        )
    {

        helperConfig = new HelperConfig();

        (weth, wbtc, deployerKey, wbtcUsdPriceFeed, wethUsdPriceFeed) = helperConfig.activeNetworkConfig();

        vm.startBroadcast(deployerKey);
        // vm.startBroadcast();

        futuresAddr = _deployFutures();
        liquidityPoolAddr = _deployLiquidityPool();
        mockUsdcAddr = _deployMockUSDC();
        dxdAddr = _deployDXD();
        priceFeedAddr = _deployPriceFeed();

        tokens.push(wbtc);
        tokens.push(weth);
        priceFeed.push(wbtcUsdPriceFeed);
        priceFeed.push(wethUsdPriceFeed);

        PriceFeed(priceFeedAddr).initialize(
            usdc,
            tokens,
            priceFeed,
            wbtc,
            weth
        );

        DXD(dxdAddr).initialize("deXodus Exchange", "DXD");

        // LIQUIDITY POOL INITIALIZATION
        LiquidityPool(liquidityPoolAddr).initialize(
            mockUsdcAddr,
            "deXodus LP",
            "DXDLP"
        );

        // FUTURES INITIALIZATION
        Futures(futuresAddr).initialize(
            liquidityPoolAddr,
            mockUsdcAddr
        );

        vm.stopBroadcast();

        return (
            futuresAddr,
            liquidityPoolAddr,
            mockUsdcAddr,
            helperConfig,
            dxdAddr,
            priceFeedAddr
        );
    }

    function _deployFutures() internal returns (address) {
        Futures futures = new Futures();
        bytes memory bytess;
        ERC1967Proxy futuresProxy = new ERC1967Proxy(address(futures), bytess);
        return address(futuresProxy);
    }

    function _deployLiquidityPool() internal returns (address) {
        LiquidityPool liquidityPool = new LiquidityPool();
        bytes memory bytess;
        ERC1967Proxy liquidityPoolProxy = new ERC1967Proxy(
            address(liquidityPool),
            bytess
        );
        return address(liquidityPoolProxy);
    }

    function _deployMockUSDC() internal returns (address) {
        MockUSDC mockUSDC = new MockUSDC();
        ERC1967Proxy mockUSDCProxy = new ERC1967Proxy(
            address(mockUSDC),
            ""
        );
        return address(mockUSDCProxy);
    }

    function _deployDXD() internal returns (address) {
        DXD dxd = new DXD();
        bytes memory bytess;
        ERC1967Proxy dxdProxy = new ERC1967Proxy(address(dxd), bytess);
        return address(dxdProxy);
    }

    function _deployPriceFeed() internal returns (address) {
        PriceFeed _priceFeed = new PriceFeed();
        bytes memory bytess;
        ERC1967Proxy priceFeedProxy = new ERC1967Proxy(address(_priceFeed), bytess);
        return address(priceFeedProxy);
    }
        

    
}