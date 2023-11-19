import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";

import { USDC_ABI } from "../../../smartContracts/USDC_Test";
import { floatToBigInt } from "@/lib/bigIntegers";

export async function approve(Erc20Address, spenderAddress, amount, decimals = 6) {
  const config = await prepareWriteContract({
    address: Erc20Address,
    abi: USDC_ABI,
    functionName: "approve",
    args: [spenderAddress, floatToBigInt(amount, decimals)],
    //chainId: chain.id,
  });

  const { hash } = await writeContract(config);

  const data = await waitForTransaction({ hash });

  return data;
}
