import { Navbar } from "@/components/layout/navbar";
import TradingViewWidget from "@/components/tradingViewWidget";
import Head from "next/head";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { ExchangeUserInfo } from "@/components/exchangeUserInfo";
import { Trading } from "@/components/trading";
import { useMarket } from "@/context/marketContext";
import { usePrice } from "@/context/priceContext";

export default function Home() {
  const { market } = useMarket();
  const { getPriceByMarket } = usePrice();
  const price = getPriceByMarket(market);

  return (
    <>
      <div className="w-full">
        <div className="lg:flex">
          <main className="flex-auto w-full min-h-screen lg:static lg:max-h-full lg:overflow-visible bg-[#0d1116]">
            <Head>
              <title>
                GamiDex |{" "}
                {price
                  ? Number(price).toLocaleString("en", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : ""}
              </title>
              <meta
                name="description"
                content="ETH Istanbul project"
              />
              <link rel="icon" href="/images/favicon/bull-icon-32.png" />
            </Head>
            <div className="container mx-auto py-10 bg-[#0d1116]">
              <div className="flex flex-col lg:flex-row lg:space-x-6">
                <div id="left" className="grid grid-cols-1 w-full">
                  <div id="exchange-chart" style={{ height: "600px" }}>
                    <TradingViewWidget
                      chartSymbol={
                        market == 1 ? "BINANCE:BTCUSDC" : "BINANCE:ETHUSDC"
                      }
                    />
                  </div>
                  <div id="exchange-info" className="mt-6 hidden lg:block">
                    <ExchangeUserInfo />
                  </div>
                </div>
                <div id="right" className="grid gird-cols-1">
                  <div className="w-96 grid relative">
                    <div className="w-full max-w-md p-2 bg-black/30 rounded-xl">
                      <Tabs isFitted variant="solid-rounded" colorScheme="teal">
                        <TabList className="space-x-1 rounded-full bg-gray-900">
                          <Tab>Long</Tab>
                          <Tab isDisabled>Short</Tab>
                        </TabList>
                        <TabPanels>
                          <TabPanel>
                            <Trading type="long" />
                          </TabPanel>
                          <TabPanel>
                            <Trading type="short" />
                          </TabPanel>
                        </TabPanels>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
              <div id="exchange-info" className="mt-6  lg:hidden">
                <ExchangeUserInfo />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
