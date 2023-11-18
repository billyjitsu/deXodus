import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import { AddLiquidityButton } from "@/components/tradingComponents/addLiquidityButton";
import { WithdrawLiquidityButton } from "@/components/tradingComponents/withdrawLiquidityButton";
import { useErc20Allowance } from "@/hooks/useErc20Allowance";
import { useBalance, useAccount } from "wagmi";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useDeployment } from "@/context/deploymentContext";

export default function Home() {
  const isMounted = useIsMounted();
  const { address, isConnected } = useAccount();
  const { deployment } = useDeployment();
  const [quantity, setQuantity] = useState(0.0);
  const [quantityW, setQuantityW] = useState(0.0);
  const { balance: allowance, isLoading: isLoadingAllowance } =
    useErc20Allowance(
      deployment.usdc,
      deployment.liquidity
    );

  const { data, isError, isLoading } = useBalance({
    address: address,
    token: deployment.liquidity,
    watch: true,
  });

  const { data: USDCBalance, balanceIsLoading } = useBalance({
    address: address,
    token: deployment.usdc,
    watch: true,
  });

  const changeLiquidity = (value) => {
    if (isNaN(value) || !isFinite(value)) {
      setQuantity(0);
      return;
    }
    setQuantity(parseFloat(value));
  };

  const changeLiquidityW = (value) => {
    if (isNaN(value) || !isFinite(value)) {
      setQuantityW(0);
      return;
    }
    setQuantityW(parseFloat(value));
  };

  return (
    <>
      <div className="w-full">
        <div className="lg:flex">
          <main className="flex-auto w-full min-h-screen lg:static lg:max-h-full lg:overflow-visible bg-[#0d1116]">
            <Head>
              <title>Liquidity</title>
              <meta
                name="description"
                content="ETH Istanbul project"
              />
              <link rel="icon" href="/images/favicon/bull-icon-32.png" />
            </Head>
            <div className="container mx-auto py-10 bg-[#0d1116] flex flex-col w-full items-center justify-center">
              <div className="flex mb-6">
                <h1 className="text-white text-xl">
                  PROVIDE LIQUIDITY
                </h1>
              </div>
              <div className="flex mb-6">
                <div className="p-4 w-fit bg-gray-900 border-gray-600 rounded-lg">
                  <div className="flex items-center justify-between text-sm font-medium text-gray-400">
                    <div>
                      <span className="">Quantity: </span>
                    </div>
                    <span className="">
                      Balance:{" "}
                      <span
                        className="text-white cursor-pointer"
                        onClick={() =>
                          changeLiquidity(parseFloat(USDCBalance?.formatted))
                        }
                      >
                        {" "}
                        {isMounted && !balanceIsLoading && USDCBalance
                          ? parseFloat(USDCBalance.formatted).toFixed(4)
                          : "..."}
                      </span>
                    </span>
                  </div>
                  <div className="w-fit mt-3 flex items-center justify-between">
                    <input
                      value={quantity}
                      type="text"
                      inputMode="decimal"
                      autoComplete="off"
                      autoCorrect="off"
                      minLength={1}
                      maxLength={15}
                      spellCheck="false"
                      id="pay-input"
                      className="bg-transparent sm:text-lg text-white"
                      placeholder="0.00"
                      onChange={(e) => {
                        changeLiquidity(parseFloat(e.target.value));
                      }}
                    />
                    <div className="flex items-center">
                      <Image
                        src="/images/crypto_logos/usd-coin-usdc-logo-40.png"
                        width={40}
                        height={40}
                        style={{ width: "22px", height: "22px" }}
                        alt="USDC logo"
                      />
                      <span className="ml-1 text-white font-semibold text-lg">
                        USDC
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex gap-4 items-center">
                  <AddLiquidityButton amount={quantity} />
                </div>
              </div>
              <div className="flex">
                <div className="p-4 w-fit bg-gray-900 border-gray-600 rounded-lg">
                  <div className="flex items-center justify-between text-sm font-medium text-gray-400">
                    <div>
                      <span className="">Quantity: </span>
                    </div>
                  </div>
                  <div className="w-fit mt-3 flex items-center justify-between">
                    <input
                      value={quantityW}
                      type="text"
                      inputMode="decimal"
                      autoComplete="off"
                      autoCorrect="off"
                      minLength={1}
                      maxLength={15}
                      spellCheck="false"
                      id="pay-input"
                      className="bg-transparent sm:text-lg text-white"
                      placeholder="0.00"
                      onChange={(e) => {
                        changeLiquidityW(parseFloat(e.target.value));
                      }}
                    />
                    <div className="flex items-center">
                      <Image
                        src="/images/crypto_logos/usd-coin-usdc-logo-40.png"
                        width={40}
                        height={40}
                        style={{ width: "22px", height: "22px" }}
                        alt="USDC logo"
                      />
                      <span className="ml-1 text-white font-semibold text-lg">
                        PPLP
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex gap-4 items-center mt-6">
                  <WithdrawLiquidityButton amount={quantityW} />
                </div>
              </div>
              <p>
                {!isLoading && data && (
                  <>
                    <div className="text-white font-semibold text-lg mt-6">
                      Your balance is{" "}
                      {Number(data.formatted).toLocaleString("en", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      PPLP
                    </div>
                  </>
                )}
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
