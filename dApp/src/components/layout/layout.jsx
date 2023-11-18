import { Navbar } from "./navbar";
import React, { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { useETH1InchPriceAggregator } from "@/hooks/useETH1inchPriceAggregator";
import { useBTC1InchPriceAggregator } from "@/hooks/useBTC1inchPriceAggregator";
import { usePrice } from "@/context/priceContext";
import { useMarket } from "@/context/marketContext";
import { useDeployment } from "@/context/deploymentContext";
import { useNetwork } from "wagmi";

export default function Layout({ children, ...props }) {
  const { isLoading: ethIsLoading1inch } = useETH1InchPriceAggregator();
  const { isLoading: btcIsLoading1inch } = useBTC1InchPriceAggregator(
    "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
  ); //WBTC (mainnet) address
  const { market } = useMarket();
  const { getDeploymentAddress, setDeploymentData } = useDeployment();
  const { getPriceByMarket } = usePrice();
  const price = getPriceByMarket(market);
  const { chain, chains } = useNetwork();

  //Load deployment context
  useEffect(() => {
    let deployment;
    deployment = {
      futures: process.env.NEXT_PUBLIC_SEPOLIA_FUTURES_ADDRESS,
      liquidity: process.env.NEXT_PUBLIC_SEPOLIA_LIQUIDITY_ADDRESS,
      usdc: process.env.NEXT_PUBLIC_SEPOLIA_USDC_TEST,
    };

    setDeploymentData(deployment);
  }, [chain]);

  console.log("ethIsLoading1inch", ethIsLoading1inch);
  console.log("btcIsLoading1inch", btcIsLoading1inch);

  if (ethIsLoading1inch || btcIsLoading1inch || !price ) {
    console.log("loading");
    return (
      <div className="w-full flex justify-center items-center h-screen bg-[#0d1116]">
        <Navbar />
        <Spinner
          size="xl"
          colorScheme="teal"
          thickness="4px"
          emptyColor="gray.800"
          color="teal.500"
        />
      </div>
    );
  } else {
    return (
      <>
        <Navbar />
        <div className="w-full">
          <div className="lg:flex">
            <main className="flex-auto w-full min-h-screen lg:static lg:max-h-full lg:overflow-visible bg-neutral-100 dark:bg-dark-bg-color dark:text-white">
              {children}
            </main>
          </div>
        </div>
      </>
    );
  }
}
