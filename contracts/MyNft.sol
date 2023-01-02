// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract MyNft is
  ERC721
{
  // uint public unlockTime;
  // address payable public owner;

  // event Withdrawal(uint amount, uint when);

  constructor()
    ERC721("test name", "test symbol")
  {

  }

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdCounter;

  function hello() public pure returns (string memory) {
    return "Hello";
  }

  function safeMint(address to)
    external
  {
    _tokenIdCounter.increment();
    uint256 tokenId = _tokenIdCounter.current();
    _safeMint(to, tokenId);
  }
}
