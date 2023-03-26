// npx hardhat run scripts/deploy.ts --network
import { ethers } from "hardhat";

async function main() {
  const MyNft = await ethers.getContractFactory("MyNft");
  const myNft = await MyNft.deploy();

  await myNft.deployed();

  console.log(`deployed to ${myNft.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
