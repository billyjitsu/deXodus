// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {Futures} from "../src/Futures.sol";
import {LiquidityPool} from "../src/LiquidityPool.sol";
import {MockUSDC} from "../src/mocks/MockUSDC.sol";
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

    /*
    STEPS FOR UPDATE DEPLOYENT SCRIPT:
    - MAKE THE _DEPLOY FUNCTION OF THE GIVEN CONTRACT
        - DECLARE CONTRACT VARIABLE
        - DECLARE ADDR
    */

contract DeployProtocol is Script {

    address weth;
    address wbtc;
    address usdc;
    uint256 deployerKey;

    function run() external returns (
        address futuresAddr,
        address liquidityPoolAddr,
        address mockUsdcAddr,
        HelperConfig helperConfig
        )
    {

        helperConfig = new HelperConfig();

        (weth, wbtc, deployerKey) = helperConfig.activeNetworkConfig();

        vm.startBroadcast(deployerKey);
        // vm.startBroadcast();

        futuresAddr = _deployFutures();
        liquidityPoolAddr = _deployLiquidityPool();
        mockUsdcAddr = _deployMockUSDC();

        // LIQUIDITY POOL INITIALIZATION
        LiquidityPool(liquidityPoolAddr).initialize(
            mockUsdcAddr,
            "deXodus",
            "dxd"
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
            helperConfig
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
        

        

    
}