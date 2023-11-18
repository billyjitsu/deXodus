import { Button } from "@chakra-ui/react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useNetwork,
} from "wagmi";
import { dxdABI } from "../../smartContracts/dxd";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { floatToBigInt } from "@/lib/bigIntegers";
import { useAccount } from "wagmi";
import { useDeployment } from "@/context/deploymentContext";

export const MintDXDButton = ({ amount = 100 }) => {
  const [txStatus, setTxStatus] = useState("idle");
  const toast = useToast();
  const { deployment } = useDeployment();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain } = useNetwork();

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: deployment.dxd,
    abi: dxdABI,
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
        description: `Successfully minted ${amount} DXD!`,
        status: "success",
        duration: 7000,
        isClosable: true,
      });
    },
  });

  return (
    <Button
      colorScheme="teal"
      onClick={write}
      isLoading={isLoading}
      loadingText="Submitting"
    >
      Mint DXD
    </Button>
  );
};
