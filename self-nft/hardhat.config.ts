import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    mainnet: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY]
    }
  },
};

export default config;
