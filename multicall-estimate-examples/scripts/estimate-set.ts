// npx hardhat run scripts/estimate-mint.ts --network goerli
import { ethers } from "hardhat";

async function main() {
  const provider = ethers.provider;

  const Lock = await ethers.getContractFactory("Lock");
  const LockInstance = Lock.attach("0xe8D442187234497C795f52c5A821ec3e0Fe344F7");

  // Get the current base fee
  const block = await provider.getBlock("latest");
  const baseFee = block.baseFeePerGas;
  if (!baseFee) throw new Error("Base fee is not available yet");
  console.log(`Current base fee: ${baseFee.toString()} Gwei`);

  // Set the priority fee (tip)
  const priorityFee = ethers.utils.parseUnits("1", "gwei");
  console.log(`Priority fee (tip): ${priorityFee.toString()} Gwei`);

  // Calculate the total gas price (base fee + priority fee)
  const gasPrice = baseFee.add(priorityFee);
  console.log(`Total gas price: ${gasPrice.toString()} Gwei`);

  const count = 1000;

  let totalEstimatedGas = ethers.BigNumber.from(0);
  for (let i = 0; i < count; i++) {
    const tx = await LockInstance.populateTransaction.set(`key${i}`, `value${i}`);
    const estimatedGas = await provider.estimateGas(tx);
    console.log(`${i}個目のsetの推定ガス: ${estimatedGas}`)
    totalEstimatedGas = totalEstimatedGas.add(estimatedGas);
  }
  console.log(`シングルsetの推定Gas: ${totalEstimatedGas}`);

  const estimatedCost = totalEstimatedGas.mul(gasPrice);
  console.log(
    `Estimated single set cost: ${ethers.utils.formatEther(estimatedCost)} ETH`
  );

  // multicall
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(LockInstance.interface.encodeFunctionData("set", [`key${i}`, `value${i}`]));
  }
  const tx = await LockInstance.populateTransaction.multicall(data);
  const estimatedGas = await provider.estimateGas(tx);
  console.log(`multicallの推定GAS: ${estimatedGas}`)

  const estimatedMulticallCost = estimatedGas.mul(gasPrice);
  console.log(
    `Estimated multicall cost: ${ethers.utils.formatEther(estimatedMulticallCost)} ETH`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
