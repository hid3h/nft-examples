// npx hardhat run scripts/mint.ts --network goerli
import { ethers } from "hardhat";
require("dotenv").config();

const contract = require("../artifacts/contracts/MyNft.sol/MyNft.json");

const provider = ethers.provider;
const signer = provider.getSigner();
const abi = contract.abi;

const myNftContract = new ethers.Contract(
  process.env.GOERLI_CONTRACT_ADDRESS || "",
  abi,
  signer
);

async function main() {
  const to = await signer.getAddress();
  const tokenId = 1;
  const nftTxn = await myNftContract.safeMint(to, tokenId);

  await nftTxn.wait();

  console.log(
    `NFT Minted! Check it out at: https://etherscan.io/tx/${nftTxn.hash}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
