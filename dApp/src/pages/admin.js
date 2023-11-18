import Head from "next/head";
import { MintButton } from "@/components/mintButton";
import { MintDXDButton } from "@/components/mintDXDButton";
import { useBalance } from "wagmi";
import { useAccount } from "wagmi";

export default function Home() {
  const { address } = useAccount();

  return (
    <>
      <div className="w-full">
        <div className="lg:flex">
          <main className="flex-auto w-full min-h-screen lg:static lg:max-h-full lg:overflow-visible bg-[#0d1116]">
            <Head>
              <title>Liquidity</title>
              <meta name="description" content="ETH Istanbul project" />
              <link rel="icon" href="/images/favicon/bull-icon-32.png" />
            </Head>
            <div className="container mx-auto py-10 bg-[#0d1116] flex flex-col w-full items-center justify-center">
              <div className="mt-10 flex mb-6">
                <h1 className="text-white text-xl">ADMIN OPTIONS</h1>
              </div>
              <div className="flex">
                <div className="ml-5 flex gap-4 items-center">
                  <div>
                    <MintButton />
                  </div>
                  <div>
                    <MintDXDButton />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
