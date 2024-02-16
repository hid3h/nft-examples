// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract HideExampleNft is ERC721, Ownable {
  constructor() ERC721("HideExampleNft", "HENFT") Ownable(_msgSender()) {}

  function _baseURI() internal pure override returns (string memory) {
    return "https://hid3h.github.io/assets/hide-example-nft/metadata/";
  }

  function safeMint(address to, uint256 tokenId) public onlyOwner {
    _safeMint(to, tokenId);
  }
}
