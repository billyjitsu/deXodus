import { useState, useEffect } from "react";
import { useContractRead, useNetwork } from "wagmi";
import { USDC_ABI } from "../../smartContracts/USDC_Test";
import { useAccount } from "wagmi";

export const useErc20Allowance = (Erc20Address, spender) => {
  const [balance, setBalance] = useState(null);
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain } = useNetwork();

  const { data, isError, isLoading } = useContractRead({
    address: Erc20Address,
    abi: USDC_ABI,
    functionName: "allowance",
    args: [address, spender],
    chainId: chain.id,
    watch: true,
  });

  useEffect(() => {
    if (data && !isError) {
      // divide by 10^18
      const humanData = parseFloat(data.toString()) / 10 ** 6;
      setBalance(humanData);
    }
  }, [isLoading, data, isError]);

  return { balance, isLoading };
};
