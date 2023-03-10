import { ethers } from "hardhat";
require('dotenv').config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "";
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY || "";

const contract = require("../artifacts/contracts/MyNft.sol/MyNft.json")

const provider = new ethers.providers.AlchemyProvider("goerli", ALCHEMY_API_KEY)
const signer = new ethers.Wallet(GOERLI_PRIVATE_KEY, provider)
const abi = contract.abi;

const myNftContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

async function main() {
  const to = signer.address
  const tokenId = 0
  const nftTxn = await myNftContract.safeMint(to, tokenId)

  await nftTxn.wait()

  console.log(`NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
