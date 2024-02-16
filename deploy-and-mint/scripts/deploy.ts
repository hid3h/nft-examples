import { ethers } from "hardhat";

async function main() {
  const hideExampleNft = await ethers.deployContract("HideExampleNft");

  await hideExampleNft.waitForDeployment();

  console.log(`deployed to ${hideExampleNft.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
