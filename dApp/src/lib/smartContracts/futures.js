import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";

import { FuturesABI } from "../../../smartContracts/futures";
import { floatToBigInt } from "@/lib/bigIntegers";

export async function increasePosition(marketId, size, collateral, price, futuresAddress) {
  console.log("increasePosition", marketId, size, collateral, price, futuresAddress);
  const config = await prepareWriteContract({
    address: futuresAddress,
    abi: FuturesABI,
    functionName: "increasePosition",
    args: [
      marketId,
      floatToBigInt(size),
      floatToBigInt(collateral),
      floatToBigInt(price ? parseFloat(price) : 0),
      true,
    ],
    //chainId: chain.id,
  });

  const { hash } = await writeContract(config);

  const data = await waitForTransaction({ hash });

  return data;
}
