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

  it("Should have correct token name and symbol", async () => {
    const { myNft } = await loadFixture(deployFixture);

    expect(await myNft.name()).to.equal("HideGithubNFT");
    expect(await myNft.symbol()).to.equal("HIDEGC");
  });

  it("Should mint a new token correctly", async () => {
    const { myNft, owner, otherAccount } = await loadFixture(deployFixture);

    const tokenId = 1;
    await myNft.connect(owner).safeMint(otherAccount.address, tokenId);
    expect(await myNft.ownerOf(tokenId)).to.equal(otherAccount.address);
  });

  it("Should only allow the owner to mint tokens", async () => {
    const { myNft, otherAccount } = await loadFixture(deployFixture);

    const tokenId = 1;
    await expect(myNft.connect(otherAccount).safeMint(otherAccount.address, tokenId)).to.be.revertedWith(
      "Ownable: caller is not the owner"
    )
  });

  it("Should correctly set token URI after minting", async () => {
    const { myNft, owner, otherAccount } = await loadFixture(deployFixture);

    const tokenId = 1;
    await myNft.connect(owner).safeMint(otherAccount.address, tokenId);
    const tokenURI = await myNft.tokenURI(tokenId);
    expect(tokenURI).to.equal("https://hid3h.github.io/assets/nft/metadata/1");
  });
});
