import Head from "next/head";
import { NFTCollectionV2 } from "@/components/nftCollectionV2";
import { Chests } from "@/components/Chests";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Liquidity</title>
        <meta name="description" content="ETH Istanbul project" />
        <link rel="icon" href="/images/favicon/bull-icon-32.png" />
      </Head>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold bg-gradient-to-bl from-fuchsia-700 via-purple-700 to-fuchsia-800 bg-clip-text text-transparent">
          Guardians
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Unique digital assets that not only represent your trading
          achievements but also grow and evolve as you succeed in the market.
        </p>
        <h2 className="mt-10 text-2xl font-bold bg-gradient-to-bl from-fuchsia-700 via-purple-700 to-fuchsia-800 bg-clip-text text-transparent">
          Get new guardians
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          Discover Exclusive NFT guardians in chests
        </p>
        <Chests />
        <h2 className="mt-10 text-2xl font-bold bg-gradient-to-bl from-fuchsia-700 via-purple-700 to-fuchsia-800 bg-clip-text text-transparent">
          My guardians
        </h2>
        <NFTCollectionV2 />
      </div>
    </div>
  );
}
