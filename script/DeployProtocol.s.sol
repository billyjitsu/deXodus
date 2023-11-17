// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {Futures} from "../src/Futures.sol";
import {LiquidityPool} from "../src/LiquidityPool.sol";

    /*
    STEPS FOR UPDATE DEPLOYENT SCRIPT:
    - MAKE THE _DEPLOY FUNCTION OF THE GIVEN CONTRACT
        - DECLARE CONTRACT VARIABLE
        - DECLARE ADDR
    */

contract DeployProtocol is Script {
    function run() external returns (address futuresAddr, address liquidityPoolAddr)

    helperConfig = new HelperConfig();
}