import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useContractRead } from "wagmi";
import { useDeployment } from "@/context/deploymentContext";
import { chestABI } from "../../smartContracts/chest";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import { openChest, buyChest } from "@/lib/smartContracts/chest";
import { approve } from "@/lib/smartContracts/erc20Functions";
import { useErc20Allowance } from "@/hooks/useErc20Allowance";
import { claimNfts } from "@/lib/smartContracts/chest";
import { Center } from "@chakra-ui/react";

export const Chests = ({}) => {
  const { address } = useAccount();
  const { deployment } = useDeployment();
  const [isLoadingBuy, setIsLoadingBuy] = useState(false);
  const [isLoadingOpen, setIsLoadingOpen] = useState(false);
  const [isLoadingClaim, setIsLoadingClaim] = useState(false);

  const { balance: allowanceUSDC } = useErc20Allowance(
    deployment.usdc,
    deployment.chest
  );

  const { balance: allowanceEXD } = useErc20Allowance(
    deployment.exd,
    deployment.chest
  );

  const { data } = useContractRead({
    address: deployment.chest,
    abi: chestABI,
    functionName: "balanceOf",
    args: [address, 1],
    watch: true,
  });
  console.log("chests", data);

  useEffect(() => {}, [data]);

  const handleBuy = async () => {
    try {
      setIsLoadingBuy(true);
      if (allowanceUSDC < 50) {
        const approveReq = await approve(deployment.usdc, deployment.chest, 50);
      }
      await buyChest(deployment.chest);
      setIsLoadingBuy(false);
    } catch (e) {
      console.log(e);
      setIsLoadingBuy(false);
    }
  };

  const handleOpen = async () => {
    try {
      setIsLoadingOpen(true);
      if (allowanceEXD < 1) {
        const approveReq = await approve(
          deployment.exd,
          deployment.chest,
          1,
          18
        );
      }
      await openChest(deployment.chest);
      setIsLoadingOpen(false);
    } catch (e) {
      console.log(e);
      setIsLoadingOpen(false);
    }
  };

  const handleClaim = async () => {
    try {
      setIsLoadingClaim(true);
      await claimNfts(deployment.chest);
      setIsLoadingClaim(false);
    } catch (e) {
      console.log(e);
      setIsLoadingClaim(false);
    }
  };

  return (
    <div className="flex items-center">
      <div className="-ml-6">
        <Image
          src="/images/chest.png"
          alt="Chests"
          width={928}
          height={928}
          className="w-60 h-auto"
        />
        <div className="flex justify-center items-center -mt-10">
          <div className="font-semibold text-xl bg-gradient-to-b from-orange-300 to-yellow-300 bg-clip-text text-transparent">
            Price
          </div>
          <div className="text-2xl text-white ml-2">{}50 USDC</div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div>
          <span className="font-semibold bg-gradient-to-b from-orange-300 to-yellow-300 bg-clip-text text-transparent">
            Chests:
          </span>{" "}
          <span className="text-white ">{Number(data)}</span>
        </div>
        <Button
          colorScheme="pink"
          size="lg"
          className="mt-4 w-32"
          isLoading={isLoadingOpen}
          onClick={handleOpen}
        >
          Open
        </Button>
        <Button
          colorScheme="pink"
          size="lg"
          className="w-32 mt-4"
          isLoading={isLoadingClaim}
          onClick={handleClaim}
        >
          Claim NFTs
        </Button>
        <Button
          colorScheme="pink"
          size="lg"
          className="w-32 mt-4"
          isLoading={isLoadingBuy}
          onClick={handleBuy}
        >
          Buy
        </Button>
      </div>
    </div>
  );
};
