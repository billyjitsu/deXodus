import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { usePrice } from "@/context/priceContext";
import { useErc20Allowance } from "@/hooks/useErc20Allowance";
import { approve } from "@/lib/smartContracts/erc20Functions";
import { increasePosition } from "@/lib/smartContracts/futures";
import { useMarket } from "@/context/marketContext";
import { useDeployment } from "@/context/deploymentContext";

export const OpenPositionButton = ({ collateral, leverage, type = "long" }) => {
  const { market } = useMarket();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { getPriceByMarket } = usePrice();
  const price = getPriceByMarket(market);
  const { deployment } = useDeployment();
  const { balance: allowance, isLoading: isLoadingAllowance } =
    useErc20Allowance(deployment.usdc, deployment.futures);

  //Size is collateral * leverage, use 2 decimals precision
  const size = parseFloat((collateral * leverage).toFixed(2));

  const handleOpenPosition = async () => {
    setIsLoading(true);
    try {
      if (allowance < collateral) {
        const approveReq = await approve(
          deployment.usdc,
          deployment.futures,
          collateral
        );
      }
      const increasePositionReq = await increasePosition(
        market,
        size,
        collateral,
        price,
        deployment.futures,
      );
      toast({
        title: "Position opened",
        description: "Your position has been opened successfully",
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
      onClick={handleOpenPosition}
      isLoading={isLoading}
      loadingText="Submitting"
      isDisabled={!price}
    >
      {!price ? "Loading...please wait" : "Open position"}
    </Button>
  );
};
