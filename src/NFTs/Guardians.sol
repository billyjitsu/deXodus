// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Guardians is ERC1155, Ownable {

    using Strings for uint256;

    string public name;
    string public symbol;

    struct PredatorAttributes {
        Animal animal;
        Evolution evolution;
        uint256 age;
        uint256 experience;
    }

    enum Evolution {
        Child,
        Teen,
        Young,
        Adult,
        Veteran,
        Master
    }

    enum Animal {
        Bull,
        Bear
    }

    // mapping(PredatorAttributes attribute => uint256 quantity) globalQuantityPerAttribute;
    mapping(uint256 id => PredatorAttributes attribute) public predatorAttributes;
    mapping(uint256 age => uint256 maxExperience) public maxExpPerAge;      // exp max to change age
    mapping(Evolution evolution => uint256 maxAge) public ageToEvolution;   // age max to evolve
    mapping(address => uint256[]) public holdings;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseURI,
        uint256[6] memory _agesToEvolution,
        uint256[100] memory _experiences
    ) ERC1155(_baseURI) {
        name = _name;
        symbol = _symbol;

        for (uint256 i; i < 100; i++) {
            maxExpPerAge[i] = _experiences[i];
        }

        for (uint256 i; i < 6; i++) {
            ageToEvolution[Evolution(i)] = _agesToEvolution[i];
        }
    }

    // we can cut this
    function increaseExperience(uint256 _id, uint256 _expIncrease) public {
        uint256 age = predatorAttributes[_id].age;
        uint256 exp = predatorAttributes[_id].experience;
        Evolution evolution = predatorAttributes[_id].evolution;
        uint256 maxExp;

        while(_expIncrease > 0){
            maxExp = maxExpPerAge[age];
            if (exp + _expIncrease < maxExp) {
                predatorAttributes[_id].experience += _expIncrease;
                _expIncrease = 0;
            } else if (age == ageToEvolution[evolution]) {
                predatorAttributes[_id].experience = maxExp;
                _expIncrease = 0;
            } else {
                uint256 _expIncrease = _expIncrease + exp - maxExp;
                predatorAttributes[_id].experience = 0;
                exp = 0;
                age++;
                predatorAttributes[_id].age++;
            }
        }
    }

    // we can cut this
    function evolve(address _to, uint256[] calldata _ids) public {
        require(_ids.length == 4);

        Evolution ev = predatorAttributes[_ids[0]].evolution;
        uint256 maxAge = ageToEvolution[ev];
        require(_checkMaxAges(_ids, maxAge));

        uint256 maxExp = maxExpPerAge[maxAge];
        require(_checkMaxExperiences(_ids, maxExp));

        uint256[] memory amounts = new uint256[](4);
        amounts[0] = 1;
        amounts[1] = 1;
        amounts[2] = 1;
        amounts[3] = 1;

        _burnBatch(_to, _ids, amounts);  
        //_mint();
    }

    function _checkMaxAges(uint256[] calldata _ids, uint256 _maxAge) internal returns (bool) {
        return  predatorAttributes[_ids[0]].age == _maxAge &&
                predatorAttributes[_ids[1]].age == _maxAge &&
                predatorAttributes[_ids[2]].age == _maxAge &&
                predatorAttributes[_ids[3]].age == _maxAge;
    }

    function _checkMaxExperiences(uint256[] calldata _ids, uint _maxExp) internal returns (bool) {
        return  predatorAttributes[_ids[0]].experience == _maxExp &&
                predatorAttributes[_ids[1]].experience == _maxExp &&
                predatorAttributes[_ids[2]].experience == _maxExp &&
                predatorAttributes[_ids[3]].experience == _maxExp;
    }

    function mintBatch(address _to, uint256[] memory _newIds, uint256[] memory _amounts) public {
        _mintBatch(_to, _newIds, _amounts, "");
        address holder = msg.sender;
        for (uint256 i; i < 3; i++) {
            holdings[holder].push(_newIds[i]);
        }
    }

    function holdingsOf(address _holder) public view returns (uint256[] memory) {
        return holdings[_holder];
    }

    // function _updateTrait(uint256 _id) internal {
    //     // set the traits to the NFT
    //     // add 1 to the global variables
    //     // use globalQuantityPerAttribute
    // }


    function uri(uint256 id) public view override returns (string memory) {
        return string(abi.encodePacked(super.uri(0), id.toString(), ".json"));
    }
}
