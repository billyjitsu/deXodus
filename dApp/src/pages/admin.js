import Head from "next/head";
import { MintButton } from "@/components/mintButton";
import { MintNFTButton } from "@/components/mintNFTButton";
import { MintEXDButton } from "@/components/mintEXDButton";
import { MintPayMasterButton } from "@/components/mintPayMasterButton";
import { useBalance } from "wagmi";
import { useAccount } from "wagmi";
import { ClearMintButton } from "@/components/clearMintButton";

export default function Home() {
  const { address } = useAccount();

  // GET BALANCES (paymaster testing)
  const { data, isError, isLoading } = useBalance({
    address: address,
    watch: true,
  });
  const { data: paymasterBalance } = useBalance({
    address: "0x1495761496684F730Fe8a84D11C0EE6063dbC91b",
    watch: true,
  });
  const { data: usdcBalance } = useBalance({
    address: address,
    token: process.env.NEXT_PUBLIC_ZKSYNC_USDC_TEST,
    watch: true,
  });

  return (
    <div className="">
      <Head>
        <title>Liquidity</title>
        <meta name="description" content="ETH Istanbul project" />
        <link rel="icon" href="/images/favicon/bull-icon-32.png" />
      </Head>
      <div className="container mx-auto py-10 flex flex-col w-full items-center justify-center">
        <div className="mt-10 flex mb-6">
          <h1 className="text-white text-xl">ADMIN OPTIONS</h1>
        </div>
        <p className="text-white text-xl">
          My account: {data && data.formatted}
        </p>
        <p className="text-white text-xl">
          Paymaster: {paymasterBalance && paymasterBalance.formatted}
        </p>
        <p className="text-white text-xl">
          USDC: {usdcBalance && usdcBalance.formatted}
        </p>
        <div className="flex">
          <div className="ml-5 flex gap-4 items-center">
            <div>
              <MintButton />
            </div>
            <div>
              <MintPayMasterButton />
            </div>
            <div>
              <MintEXDButton />
            </div>
            <div>
              <MintNFTButton />
            </div>
            <div>
              <ClearMintButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
