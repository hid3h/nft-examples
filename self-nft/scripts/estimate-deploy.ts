// npx hardhat run scripts/my-script.js --network goerli
import { ethers } from "hardhat";

async function main() {
  const provider = ethers.provider;

  // Estimate gas for deployment
  const MyNft = await ethers.getContractFactory("MyNft");
  const deploymentTx = MyNft.getDeployTransaction();
  const estimatedDeploymentGas = await provider.estimateGas(deploymentTx);
  console.log(`Estimated gas for deployment: ${estimatedDeploymentGas}`);

  // Get the current base fee
  const block = await provider.getBlock("latest");
  const baseFee = block.baseFeePerGas;
  if (!baseFee) throw new Error("Base fee is not available yet");
  console.log(`Current base fee: ${baseFee} Gwei`);

  // Set the priority fee (tip)
  const priorityFee = ethers.utils.parseUnits("1", "gwei");
  console.log(`Priority fee (tip): ${priorityFee} Gwei`);

  // Calculate the total gas price (base fee + priority fee)
  const gasPrice = baseFee.add(priorityFee);
  console.log(`Total gas price: ${gasPrice} Gwei`);

  // Estimate the cost for deployment
  const estimatedDeploymentCost = estimatedDeploymentGas.mul(gasPrice);
  console.log(
    `Estimated deployment cost: ${ethers.utils.formatEther(
      estimatedDeploymentCost
    )} ETH`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
