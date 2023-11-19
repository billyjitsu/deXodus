import { Button } from "@chakra-ui/react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { exdABI } from "../../smartContracts/exd";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { floatToBigInt } from "@/lib/bigIntegers";
import { useAccount } from "wagmi";
import { useDeployment } from "@/context/deploymentContext";

export const MintEXDButton = ({ amount = 100 }) => {
  const [txStatus, setTxStatus] = useState("idle");
  const toast = useToast();
  const { deployment } = useDeployment();
  const { address, isConnecting, isDisconnected } = useAccount();

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: deployment.exd,
    abi: exdABI,
    functionName: "mintMock",
    args: [address, floatToBigInt(amount, 18)],
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
        title: "Minted",
        description: `Successfully minted ${amount} PPX!`,
        status: "success",
        duration: 7000,
        isClosable: true,
      });
    },
  });

  return (
    <Button
      colorScheme="pink"
      onClick={write}
      isLoading={isLoading}
      loadingText="Submitting"
    >
      Mint EXD
    </Button>
  );
};
