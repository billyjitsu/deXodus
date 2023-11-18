import { useEffect } from "react";
import { useContractRead } from "wagmi";
import { OffChainOracleAbi } from "../../smartContracts/1inchOffchainOracle";
import { mainnet } from "viem/chains";
import { usePrice } from "@/context/priceContext";

const mainnetUSDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

export const useBTC1InchPriceAggregator = (dstToken) => {
  const { price, setPriceData } = usePrice();

  const { data, isError, isLoading } = useContractRead({
    address: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    abi: OffChainOracleAbi,
    functionName: "getRate",
    args: [dstToken, mainnetUSDC, false],
    chainId: mainnet.id,
    watch: true,
  });

  useEffect(() => {
    if (data && !isError) {
      const newPrice = Number(data) / 1e16; //To make this general, we need to work with the decimals of the token
      setPriceData({ 1: newPrice }); //To make this general, change the 1 to the market id
    }
  }, [isLoading, data, isError]);

  return { price, isLoading };
};
