import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useNetwork,
} from "wagmi";
import { FuturesABI } from "../../../smartContracts/futures";
import { useToast } from "@chakra-ui/react";
import { floatToBigInt } from "@/lib/bigIntegers";
import { useDeployment } from "@/context/deploymentContext";

export const ClosePositionButton = ({
  marketId,
  sizeToClose,
  totalSize,
  marketPrice,
  type = "long",
  onSuccess, // Callback function when the transaction is successful (position is closed)
}) => {
  const toast = useToast();
  const { chain } = useNetwork();
  const { deployment } = useDeployment();
  //calculate the tenmilpercent of the position to close
  const percent = Math.round((sizeToClose / totalSize) * 10000);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: deployment.futures,
    abi: FuturesABI,
    functionName: "decreasePosition",
    args: [
      marketId,
      percent,
      floatToBigInt(marketPrice ? parseFloat(marketPrice) : 0),
      true,
      type == "long" ? true : false,
    ],
    chainId: chain.id,
    onError(error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 7000,
        isClosable: true,
      });
    },
  });

  const { data, error, isError, write } = useContractWrite({
    ...config,
    onSuccess() {
      // Handle success logic
    },
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(TxData) {
      toast({
        title: "Position closed",
        description: "Your position has been closed successfully",
        status: "info",
        duration: 7000,
        isClosable: true,
      });
      onSuccess();
    },
  });

  return (
    <>
      <Button
        colorScheme="pink"
        size="lg"
        onClick={write}
        isLoading={isLoading}
        loadingText="Closing"
        width="100%"
      >
        Close position
      </Button>
    </>
  );
};
