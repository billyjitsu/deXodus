const express = require("express");
const axios = require("axios");
const schedule = require("node-schedule");
const { ethers } = require("ethers");
const dotenv = require("dotenv");
const { futuresABI } = require("./smartContracts/futuresABI");
const { mockChangePrice } = require("./mockPriceFeed");

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const app = express();
const port = 3005;

// The Graph subgraph endpoint
const subgraphEndpoint =
  "https://api.studio.thegraph.com/query/58823/dexodus-ethsepolia/v0.0.4";

const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-sepolia.g.alchemy.com/v2/04kRge27WZPW67uUVJMnkyjhZSUMCHlg"
);

const contractAddress = process.env.FUTURES_ADDRESS;

// Your Ethereum wallet private key (keep this secure!)
const privateKey = process.env.PRIVATE_KEY.trim();
const wallet = new ethers.Wallet(privateKey, provider);

async function querySubgraph() {
  const BTCcurrentPrice = (2500 * 1000000).toFixed(0);
  const ETHcurrentPrice = (50 * 1000000).toFixed(0);

  await mockChangePrice(1, BTCcurrentPrice);
  await mockChangePrice(2, ETHcurrentPrice);

  const eventQuery = `{
    positions(
      orderBy: id, 
      orderDirection: desc, 
      where: { 
        or: [
            { and: [{isClosed: false}, { marketId: 1 }, { liqPrice_gte: ${BTCcurrentPrice} }] },
            { and: [{isClosed: false}, { marketId: 2 }, { liqPrice_gte: ${ETHcurrentPrice} }] }
        ]
      }
    ) {
      id
      trader
      marketId
      long
      isClosed
      collateral
      size
      entryPrice
      currentPrice
      liqPrice
      blockTimestamp
      positionUpdates(orderBy: blockTimestamp, orderDirection: asc) {
        updateType
        collateral
        size
        entryPrice
        currentPrice
        liqPrice
        blockTimestamp
      }
    }
  }`;

  try {
    const response = await axios.post(subgraphEndpoint, { query: eventQuery });
    const positions = response.data;
    return positions;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function processLiquidations() {
  const positions = await querySubgraph();
  console.log("positions", positions);
  if (typeof positions.data !== "undefined" && positions.data !== null) {
    await executeTransactions(positions.data.positions);
  }
}

async function executeTransactions(positions) {
  const contract = new ethers.Contract(contractAddress, futuresABI, wallet);

  positions.forEach(async (position) => {
    const customData = contract.interface.encodeFunctionData(
      "liquidatePosition",
      [position.marketId, position.trader, position.long]
    );

    // Build and sign the transaction
    const transaction = {
      to: contractAddress,
      data: customData,
    };

    try {
      const res = await wallet.sendTransaction(transaction);
      console.log("txLiquidate", res);
    } catch (error) {
      console.error("Error liquidating position:", error);
    }
  });
}

// Schedule the querySubgraph function to run every 30 seconds
schedule.scheduleJob("*/30 * * * * *", function () {
  processLiquidations();
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
