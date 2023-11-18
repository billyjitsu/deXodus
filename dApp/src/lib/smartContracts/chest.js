import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";

import { chestABI } from "../../../smartContracts/chest";

export async function buyChest(chestAddress) {
  const config = await prepareWriteContract({
    address: chestAddress,
    abi: chestABI,
    functionName: "buyChest",
  });

  const { hash } = await writeContract(config);

  const data = await waitForTransaction({ hash });
  console.log("buy finished", data);
  return data;
}

export async function openChest(chestAddress) {
  const config = await prepareWriteContract({
    address: chestAddress,
    abi: chestABI,
    functionName: "openChest",
  });

  const { hash } = await writeContract(config);

  const data = await waitForTransaction({ hash });

  return data;
}
