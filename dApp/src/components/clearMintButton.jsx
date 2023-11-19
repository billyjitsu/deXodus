import { Button } from "@chakra-ui/react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useDeployment } from "@/context/deploymentContext";
import { chestABI } from "../../smartContracts/chest";

export const ClearMintButton = ({}) => {
  const [txStatus, setTxStatus] = useState("idle");
  const toast = useToast();
  const { deployment } = useDeployment();

  console.log("chest address", deployment.chest);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: deployment.chest,
    abi: chestABI,
    functionName: "clearMinting",
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
        description: "Successfully minted 1.000.000 Test USDC!",
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
      Clear Minting
    </Button>
  );
};
