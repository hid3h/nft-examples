// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "./ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNft is
  ERC721
{
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdCounter;

  function safeMint(address to)
    external
  {
    _tokenIdCounter.increment();
    uint256 tokenId = _tokenIdCounter.current();
    _safeMint(to, tokenId);
  }

  function getAllAddress()
    public
    view
    returns (address[] memory)
  {
    address[] memory ret = new address[](_tokenIdCounter.current());
    for (uint256 i = 0; i < _tokenIdCounter.current(); i++) {
      ret[i] = ownerOf(i + 1);
    }
    return ret;
  }

  function getAllApproved()
    public
    view
    returns (address[] memory)
  {
    address[] memory ret = new address[](_tokenIdCounter.current());
    for (uint256 i = 0; i < _tokenIdCounter.current(); i++) {
      ret[i] = getApproved(i + 1);
    }
    return ret;
  }
}
