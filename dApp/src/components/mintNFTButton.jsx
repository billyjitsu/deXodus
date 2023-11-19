import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useDeployment } from "@/context/deploymentContext";
import { mintBatch } from "@/lib/smartContracts/guardians";

export const MintNFTButton = ({}) => {
  const toast = useToast();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { deployment } = useDeployment();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      colorScheme="pink"
      onClick={async () => {
        setIsLoading(true);
        await mintBatch(address, deployment);
        setIsLoading(false);
      }}
      isLoading={isLoading}
      loadingText="Submitting"
    >
      Mint random NFTs
    </Button>
  );
};
