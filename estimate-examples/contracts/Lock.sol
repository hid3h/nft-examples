// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/Multicall.sol";

contract Lock is Multicall {
    mapping (string => string) private _store;
    string[] private _keys;

    function set(string calldata key, string calldata value) public {
        if (bytes(_store[key]).length == 0) {
            _keys.push(key);
        }
        _store[key] = value;
    }

    function get(string calldata key) public view returns (string memory) {
        return _store[key];
    }

    function keys() public view returns (string[] memory) {
        return _keys;
    }

    function values() public view returns (string[] memory) {
        string[] memory _values = new string[](_keys.length);
        for (uint i = 0; i < _keys.length; i++) {
            _values[i] = _store[_keys[i]];
        }
        return _values;
    }
}
