import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("HideExampleNft", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const HideExampleNft = await ethers.getContractFactory("HideExampleNft");
    const hideExampleNft = await HideExampleNft.deploy();

    return { hideExampleNft, owner, otherAccount };
  }

  it("token nameとsymbolとオーナーが正しく設定されている", async () => {
    const { hideExampleNft, owner } = await loadFixture(deployFixture);

    expect(await hideExampleNft.name()).to.equal("HideExampleNft");
    expect(await hideExampleNft.symbol()).to.equal("HENFT");
    expect(await hideExampleNft.owner()).to.equal(owner.address);
  });

  it("ミントできる", async () => {
    const { hideExampleNft, owner, otherAccount } = await loadFixture(
      deployFixture
    );

    const tokenId = 0;
    await hideExampleNft.connect(owner).safeMint(otherAccount.address, tokenId);
    expect(await hideExampleNft.ownerOf(tokenId)).to.equal(
      otherAccount.address
    );
  });

  it("オーナー以外はミントできない", async () => {
    const { hideExampleNft, otherAccount } = await loadFixture(deployFixture);

    const tokenId = 0;
    await expect(
      hideExampleNft
        .connect(otherAccount)
        .safeMint(otherAccount.address, tokenId)
    ).to.be.revertedWithCustomError(
      hideExampleNft,
      "OwnableUnauthorizedAccount"
    );
  });

  it("token URIが正しい", async () => {
    const { hideExampleNft, owner, otherAccount } = await loadFixture(
      deployFixture
    );

    const tokenId = 0;
    await hideExampleNft.connect(owner).safeMint(otherAccount.address, tokenId);
    const tokenURI = await hideExampleNft.tokenURI(tokenId);
    expect(tokenURI).to.equal(
      "https://hid3h.github.io/assets/hide-example-nft/metadata/0"
    );
  });
});
