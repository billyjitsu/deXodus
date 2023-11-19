import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useErc20Allowance } from "@/hooks/useErc20Allowance";
import { useAccount } from "wagmi";
import { addLiquidity } from "@/lib/smartContracts/liquidityPool";
import { approve } from "@/lib/smartContracts/erc20Functions";
import { useDeployment } from "@/context/deploymentContext";

export const AddLiquidityButton = ({ amount }) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { deployment } = useDeployment();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { balance: allowance, isLoading: isLoadingAllowance } =
    useErc20Allowance(
      deployment.usdc,
      deployment.liquidity
    );

  const handleAddLiquidity = async () => {
    setIsLoading(true);
    try {
      if (allowance < amount) {
        const approveReq = await approve(
          deployment.usdc,
          deployment.liquidity,
          amount
        );
      }
      const addLiquidityReq = await addLiquidity(address, amount, deployment);
      toast({
        title: "Liquidity added",
        description: "Your liquidity has been added successfully",
        status: "success",
        duration: 7000,
        isClosable: true,
      });
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Unexpected error",
        description: "Something went wrong",
        status: "error",
        duration: 7000,
        isClosable: true,
      });
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Button
      colorScheme="pink"
      size="lg"
      onClick={handleAddLiquidity}
      isLoading={isLoading}
      loadingText="Submitting"
      className="w-32"
    >
      Add
    </Button>
  );
};
