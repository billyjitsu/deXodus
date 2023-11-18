// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {EXD} from "../EXD.sol";
import {Guardians} from "./Guardians.sol";
import {RandomNumbers} from "../Utils/RandomNumbers.sol";

contract Chest is ERC1155, Ownable {
    EXD public exd;
    ERC20Upgradeable public usdc;
    uint256 public chestPrice;
    uint256 public openSpend;
    Guardians public guardians;

    RandomNumbers public constant randomNumbers = RandomNumbers(payable(0x74D23959416e7a7C68e74CB6143631a053F0752f));

    address public nextUserToMint;
    uint256 public minting;

    modifier onlyWhenNotMinting() {
        require(minting == 1, "Only when not minting");
        _;
    }

    modifier onlynextUserToMint() {
        require(msg.sender == nextUserToMint, "Only next user to mint allowed");
        _;
    }

    constructor(uint256 _price, uint256 _spend, address _exd, address _usdc, address _guardians, string memory _baseURI) ERC1155(_baseURI) {
        exd = EXD(_exd);
        chestPrice = _price;
        openSpend = _spend;
        usdc = ERC20Upgradeable(_usdc);
        guardians = Guardians(_guardians);
        minting = 1;
    }

    function buyChest() public {
        usdc.transferFrom(msg.sender, address(this), chestPrice);
        _mint(msg.sender, 1, 1, "");
    }

    function openChest() public onlyWhenNotMinting {
        exd.transferFrom(msg.sender, address(this), chestPrice);    // burn exd
        _burn(msg.sender, 1, 1);
        _getPredatorIds();
    }

    function _getPredatorIds() internal returns (uint256[] memory) {
        nextUserToMint = msg.sender;
        minting = 2;
        randomNumbers.makeRequestUint256Array(3);
    }

    function claimNfts() public onlynextUserToMint {
        nextUserToMint = address(0);
        minting = 1;

        uint256[] memory randoms = randomNumbers.getRandomNumberArray();

        require(randoms[0] != 0, "Randoms still not available!");
        
        uint256[] memory ids = new uint256[](3);

        ids[0] = randoms[0] % 500;
        ids[1] = randoms[1] % 500;
        ids[2] = randoms[2] % 500;

        uint256[] memory amounts = new uint256[](3);
        amounts[0] = 1;
        amounts[1] = 1;
        amounts[2] = 1;

        guardians.mintBatch(msg.sender, ids, amounts);

        randomNumbers.clearRandomsArray();
    }

    function clearMinting() public onlyOwner {
        nextUserToMint = address(0);
        minting = 1;
    }

}