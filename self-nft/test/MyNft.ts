import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyNft", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const MyNft = await ethers.getContractFactory("MyNft");
    const myNft = await MyNft.deploy();

    return { myNft, owner, otherAccount };
  }

  describe("mint", () => {
    it("", async () => {
      const { myNft, owner, otherAccount } = await loadFixture(deployFixture);

      await expect(myNft.connect(otherAccount).safeMint(otherAccount.address, 0)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      )

      await myNft.connect(owner).safeMint(owner.address, 0);

      expect(await myNft.balanceOf(owner.address)).to.eq(1)
      expect(await myNft.ownerOf(0)).to.eq(owner.address)
      expect(await myNft.tokenURI(0)).to.eq("https://hid3h.github.io/assets/nft/metadata/0")
    })
  });
});
