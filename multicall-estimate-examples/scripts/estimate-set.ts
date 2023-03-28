// npx hardhat run scripts/estimate-mint.ts --network goerli
import { ethers } from "hardhat";

async function main() {
  const provider = ethers.provider;

  const Lock = await ethers.getContractFactory("Lock");
  const LockInstance = Lock.attach("0xe8D442187234497C795f52c5A821ec3e0Fe344F7");

  let totalEstimatedGas = ethers.BigNumber.from(0);
  for (let i = 0; i < 100; i++) {
    const tx = await LockInstance.populateTransaction.set(`key${i}`, `value${i}`);
    const estimatedGas = await provider.estimateGas(tx);
    console.log(`${i}個目のsetの推定ガス: ${estimatedGas}`)
    totalEstimatedGas = totalEstimatedGas.add(estimatedGas);
  }
  console.log(`totalEstimatedGas: ${totalEstimatedGas}`);

  // Get the current base fee
  const block = await provider.getBlock("latest");
  const baseFee = block.baseFeePerGas;
  if (!baseFee) throw new Error("Base fee is not available yet");
  console.log(`Current base fee: ${baseFee.toString()} Gwei`);

  // Set the priority fee (tip)
  const priorityFee = ethers.utils.parseUnits("0", "gwei");
  console.log(`Priority fee (tip): ${priorityFee.toString()} Gwei`);

  // Calculate the total gas price (base fee + priority fee)
  const gasPrice = baseFee.add(priorityFee);
  console.log(`Total gas price: ${gasPrice.toString()} Gwei`);

  const estimatedMintCost = totalEstimatedGas.mul(gasPrice);
  console.log(
    `Estimated cost: ${ethers.utils.formatEther(estimatedMintCost)} ETH`
  );

  // multicall
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
