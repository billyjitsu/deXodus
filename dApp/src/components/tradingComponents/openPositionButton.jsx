import { Button } from "@chakra-ui/react";
import { usePrice } from "@/context/priceContext";
import { useMarket } from "@/context/marketContext";

export const OpenPositionButton = ({ collateral, leverage, type = "long" }) => {
  const { market } = useMarket();
  const { getPriceByMarket } = usePrice();
  const price = getPriceByMarket(market);

  return (
    <Button
      colorScheme="teal"
      size="lg"
      loadingText="Submitting"
      isDisabled={!price}
    >
      {!price ? "Loading...please wait" : "Open position"}
    </Button>
  );
};
