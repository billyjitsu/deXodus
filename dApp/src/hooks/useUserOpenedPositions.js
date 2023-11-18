import { useState, useEffect } from "react";
import { useContractRead, useNetwork } from "wagmi";
import { FuturesABI } from "../../smartContracts/futures";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";
import { useDeployment } from "@/context/deploymentContext";

export const useUserOpenedPositions = (marketId, type = "long") => {
  const [position, setPosition] = useState(null);
  const { address, isConnecting, isDisconnected } = useAccount();
  const { deployment } = useDeployment();

  const { data, isError, isLoading } = useContractRead({
    address: deployment.futures,
    abi: FuturesABI,
    functionName: "getTraderPosition",
    args: [marketId, address, type == "long" ? true : false],
    watch: true,
  });

  useEffect(() => {
    if (data && !isError) {
      setPosition(data);
    }
  }, [isLoading, data, isError]);

  return { position, isLoading };
};
