import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyNft", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployMyNftFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const MyNft = await ethers.getContractFactory("MyNft");
    const myNft = await MyNft.deploy();

    return { myNft, owner, otherAccount };
  }

  describe("MyNfts", function () {
    it("いろいろ", async function () {
      const { myNft } = await loadFixture(deployMyNftFixture);

      const accounts = await ethers.getSigners();

      const account0Address = accounts[0].address
      await myNft.safeMint(account0Address)

      expect(await myNft.ownerOf(1)).to.equal(account0Address)
      expect(await myNft.balanceOf(account0Address)).to.equal(1)

      const account1Address = accounts[1].address
      await myNft.safeMint(account1Address)

      expect(await myNft.ownerOf(2)).to.equal(account1Address)
      expect(await myNft.balanceOf(account1Address)).to.equal(1)

      console.log(await myNft.getAllAddress());
      console.log(await myNft.getAllApproved());
    });
  });
});
