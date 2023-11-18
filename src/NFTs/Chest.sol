// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {EXD} from "../EXD.sol";
import {Guardians} from "./Guardians.sol";
import {RandomNumbers} from "../Utils/RandomNumbers.sol";

contract Chest is ERC1155, Ownable {
    using Strings for uint256;

    EXD public exd;
    ERC20Upgradeable public usdc;
    uint256 public chestPrice;
    uint256 public openSpend;
    Guardians public guardians;

    RandomNumbers public constant randomNumbers = RandomNumbers(payable(0xf3b7A9c9af5eDe9701bADBEefC670D70760645D7));

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

        ids[0] = randoms[0] % 200;
        ids[1] = randoms[1] % 200;
        ids[2] = randoms[2] % 200;

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

    function uri(uint256 id) public view override returns (string memory) {
        return string(abi.encodePacked(super.uri(0), id.toString(), ".json"));
    }

}