// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {MockUSDC} from "../src/mocks/MockUSDC.sol";
import {EXD} from "../src/EXD.sol";
import {Guardians} from "../src/NFTS/Guardians.sol";
import {Chest} from "../src/NFTS/Chest.sol";

    /*
    STEPS FOR UPDATE DEPLOYENT SCRIPT:
    - MAKE THE _DEPLOY FUNCTION OF THE GIVEN CONTRACT
        - DECLARE CONTRACT VARIABLE
        - DECLARE ADDR
    */

contract DeployNFTs is Script {

    function run() external returns (
        address guardiansAddr,
        address chestAddr
        )
    {

        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        address mockUsdcAddr = address(0);
        address exdAddr = address(0);

        guardiansAddr = _deployGuardians();
        chestAddr = _deployChest(exdAddr, mockUsdcAddr, guardiansAddr);

        vm.stopBroadcast();

        return (
            guardiansAddr,
            chestAddr
        );
    }

    function _deployChest(address exdAddr, address mockUsdcAddr, address guardiansAddr) internal returns (address) {
        uint256 chestPrice = 50e6;
        uint256 openSpending = 3;
        string memory baseURI = "";
        Chest chest = new Chest(chestPrice, openSpending, exdAddr, mockUsdcAddr, guardiansAddr, baseURI);
        return address(chest);
    }

    function _deployGuardians() internal returns (address) {
        string memory name = "Guardians";
        string memory symbol = "GRD";
        string memory baseURI = "";
        uint256[6] memory agesToEvolution = _setAges();
        uint256[100] memory experiences = _setExperience();
        Guardians guardians = new Guardians(name, symbol, baseURI, agesToEvolution, experiences);
        return address(guardians);
    }

    function _setAges() internal returns (uint256[6] memory ages) {
        ages[0] = 6;
        ages[1] = 15;
        ages[2] = 27;
        ages[3] = 42;
        ages[4] = 62;
        ages[5] = 89;
    }

    // D&D formula
    function _setExperience() internal returns (uint256[100] memory experiences) {
        for (uint i; i < 100; i++) {
            uint256 exp = 500 * (i + 2) ** 2 - 500 * (i + 2);
            experiences[i] = exp;
        }
    }
        
}