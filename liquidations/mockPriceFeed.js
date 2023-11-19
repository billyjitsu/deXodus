const { ethers } = require("ethers");
const { priceFeedABI } = require("./smartContracts/priceFeed");
const dotenv = require("dotenv");

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const marketsAddresses = {
  1: "0x806D0637Fbbfb4EB9efD5119B0895A5C7Cbc66e7", //WBTC address
  2: "0x980B62Da83eFf3D4576C647993b0c1D7faf17c73", //WETH address
};

async function mockChangePrice($marketId, newPrice) {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/04kRge27WZPW67uUVJMnkyjhZSUMCHlg"
  );
  // Your Ethereum wallet private key (keep this secure!)
  const privateKey = process.env.PRIVATE_KEY.trim();
  const wallet = new ethers.Wallet(privateKey, provider);

  const contract = new ethers.Contract(
    process.env.PRICEFEED_ADDRESS,
    priceFeedABI,
    wallet
  );

  const customData = contract.interface.encodeFunctionData("mockChangePrice", [
    marketsAddresses[$marketId],
    BigInt(newPrice) * 1000000n,
  ]);

  // Build and sign the transaction
  const transaction = {
    to: process.env.PRICEFEED_ADDRESS,
    data: customData,
  };

  try {
    const response = await wallet.sendTransaction(transaction);
    console.log("mock tx", response);
  } catch (error) {
    console.error("Error mocking price:", error);
  }
}

module.exports = {
  mockChangePrice,
};
