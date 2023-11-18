import { Button } from "@chakra-ui/react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useNetwork,
} from "wagmi";
import { LiquidityPoolABI } from "../../../smartContracts/liquidityPool";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { floatToBigInt } from "@/lib/bigIntegers";
import { useAccount } from "wagmi";
import { useDeployment } from "@/context/deploymentContext";

export const WithdrawLiquidityButton = ({
  amount,
  action = "addLiquidity",
}) => {
  const [txStatus, setTxStatus] = useState("idle");
  const toast = useToast();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { deployment } = useDeployment();
  const { chain } = useNetwork();

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: deployment.liquidity,
    abi: LiquidityPoolABI,
    functionName: "withdrawLiquidity",
    args: [address, floatToBigInt(amount, 18)],
    chainId: chain.id,
    onError(error) {
      /*toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 7000,
        isClosable: true,
      });*/
    },
  });

  const { data, error, isError, write } = useContractWrite({
    ...config,
    onSuccess() {
      setTxStatus("submitting");
    },
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(TxData) {
      setTxStatus("success");
      toast({
        title: "Withdrawal successful",
        description: "Your liquidity has been withdrawn successfully",
        status: "success",
        duration: 7000,
        isClosable: true,
      });
    },
  });

  return (
    <Button
      variant="outline"
      colorScheme="teal"
      size="lg"
      onClick={write}
      isLoading={isLoading}
      loadingText="Submitting"
      className="w-32"
    >
      Withdraw
    </Button>
  );
};
