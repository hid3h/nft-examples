import { ethers } from "hardhat";
require("dotenv").config();

const contract = require("../artifacts/contracts/HideExampleNft.sol/HideExampleNft.json");
const contractAddress = "0x038F81478a8A15300772e4D769f21a1Be3289533";
// ミント対象のアドレス
const to = "0xB55327dC3dA686b6c312De1E6c8F6361a107718a";
// トークンID
const tokenId = 0;

async function main() {
  const provider = ethers.provider;
  // 署名(mint)するアカウントを取得
  // getSigner()の引数無しの場合、デフォルトで0番目のアカウントを取得
  // ここで言うアカウントはhardhat.config.tsのaccountsにセットしているもの
  const signer = await provider.getSigner();
  const abi = contract.abi;
  // コントラクトのインスタンスを作成
  const myNftContract = new ethers.Contract(contractAddress, abi, signer);
  // コントラクトで実装したsafeMint()を呼び出してミントします
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
