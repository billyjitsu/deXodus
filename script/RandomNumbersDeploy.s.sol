// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {Script} from "forge-std/Script.sol";
import {RandomNumbers} from "../src/Utils/RandomNumbers.sol";
import {console} from "forge-std/Test.sol";

contract RandomNumbersDeploy is Script {

    function run() external returns (address payable randomNumbersAddr) {

        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        randomNumbersAddr = payable(address(_deployRandomNumbers()));

        vm.stopBroadcast();

        return (randomNumbersAddr);
    }

    function _deployRandomNumbers() internal returns (RandomNumbers _randomNumbersAddr) {
        // for ethereum sepolia testnet
        _randomNumbersAddr = new RandomNumbers(address(0x2ab9f26E18B64848cd349582ca3B55c2d06f507d));
    }
}
