import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";

import { LiquidityPoolABI } from "../../../smartContracts/liquidityPool";
import { floatToBigInt } from "@/lib/bigIntegers";

export async function addLiquidity(address, amount, deployment) {
  const config = await prepareWriteContract({
    address: deployment.liquidity,
    abi: LiquidityPoolABI,
    functionName: "addLiquidity",
    args: [address, floatToBigInt(amount)],
    //chainId: chain.id,
  });

  const { hash } = await writeContract(config);

  const data = await waitForTransaction({ hash });

  return data;
}
