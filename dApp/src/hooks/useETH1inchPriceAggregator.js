import { useState, useEffect } from "react";
import { useContractRead } from "wagmi";
import { OffChainOracleAbi } from "../../smartContracts/1inchOffchainOracle";
import { mainnet } from "viem/chains";
import { usePrice } from "@/context/priceContext";

export const useETH1InchPriceAggregator = () => {
  const { price, setPriceData } = usePrice();

  const { data, isError, isLoading } = useContractRead({
    address: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    abi: OffChainOracleAbi,
    functionName: "getRateToEth",
    args: ["0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", true], //USDC address
    chainId: mainnet.id,
    watch: true,
  });

  useEffect(() => {
    if (data && !isError) {
      const numerator = 10n ** BigInt(6);
      const denominator = 10n ** 18n; // eth decimals
      const newPrice = 1 / (Number((data * numerator) / denominator) / 1e18);
      setPriceData({ 2: newPrice });
    }
  }, [isLoading, data, isError]);

  return { price, isLoading };
};
