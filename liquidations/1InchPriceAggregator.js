const { ethers } = require("ethers");
const { OffChainOracleAbi } = require("./smartContracts/1InchOffchainOracle");

const mainnetUSDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

async function BTC1InchPriceAggregator() {
  dstToken = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"; //WBTC address
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-mainnet.g.alchemy.com/v2/fT3rh0swFV31b86wL9WwkchCjzZ4htIj"
  );
  const contract = new ethers.Contract(
    "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    OffChainOracleAbi,
    provider
  );

  try {
    const result = await contract.getRate(dstToken, mainnetUSDC, false);
    return Number(result) / 1e16;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function ETH1InchPriceAggregator() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-mainnet.g.alchemy.com/v2/fT3rh0swFV31b86wL9WwkchCjzZ4htIj"
  );

  const contract = new ethers.Contract(
    "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    OffChainOracleAbi,
    provider
  );

  try {
    const result = await contract.getRateToEth(mainnetUSDC, true);
    const denominator = 10n ** 30n; // eth decimals
    const price = Number(result) / Number(denominator);
    return 1 / price;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

module.exports = {
  BTC1InchPriceAggregator,
  ETH1InchPriceAggregator,
};
