// npx hardhat run scripts/estimate-mint.ts --network goerli
import { ethers } from "hardhat";

async function main() {
  const provider = ethers.provider;

  // Get the deployed MyNft contract instance using its address
  const MyNft = await ethers.getContractFactory("MyNft");
  const myNftInstance = MyNft.attach("contract-address"); // Replace "contract-address" with the actual deployed contract address

  // Estimate gas for mint function
  const to = "0xB55327dC3dA686b6c312De1E6c8F6361a107718a";
  const tokenId = 1;

  const mintTx = await myNftInstance.populateTransaction.safeMint(to, tokenId); // Add necessary arguments if the mint function has any
  const estimatedMintGas = await provider.estimateGas(mintTx);
  console.log(`Estimated gas for minting: ${estimatedMintGas}`);

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

  // Estimate the cost for minting
  const estimatedMintCost = estimatedMintGas.mul(gasPrice);
  console.log(
    `Estimated minting cost: ${ethers.utils.formatEther(estimatedMintCost)} ETH`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
