// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNft is ERC721, Ownable {
  constructor() ERC721("MyNft", "MYNFT") {}

  function _baseURI() internal pure override returns (string memory) {
    return "https://hid3h.github.io/assets/nft/metadata/";
  }

  function safeMint(address to, uint256 tokenId) public onlyOwner {
    _safeMint(to, tokenId);
  }
}
