import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { sepolia, mainnet } from "wagmi/chains";
import { ChakraProvider } from "@chakra-ui/react";
import { PriceProvider } from "@/context/priceContext";
import { MarketProvider } from "@/context/marketContext";
import { DeploymentProvider } from "@/context/deploymentContext";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { Hind_Siliguri } from "next/font/google";
import Layout from "@/components/layout/layout";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const font = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const { chains, publicClient } = configureChains(
  [sepolia, mainnet],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    }),
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY }),
  ] //ToDO: API KEY EXPOSED!??
);

const chainsForWallet = chains.filter((chain) => chain.id !== 1); //WE DONT WANT TO SHOW MAINNET IN THE WALLET (we need it for 1InchSpotAggregatorPrice)

const { connectors } = getDefaultWallets({
  appName: "deXodus",
  projectId: "08b54e6dae02ff39f4f482aad8655733",
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }) {
  // If avaialbale, use the layout defined at the page level. Else use the default Layout
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <div className={font.className}>
      <WagmiConfig config={config}>
        <RainbowKitProvider
          chains={chainsForWallet}
          theme={darkTheme({ accentColor: "#1B998B" })}
        >
          <ChakraProvider>
            <DeploymentProvider>
              <PriceProvider>
                <MarketProvider>
                  {getLayout(<Component {...pageProps} />)}
                </MarketProvider>
              </PriceProvider>
            </DeploymentProvider>
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}
