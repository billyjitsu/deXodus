import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AdminChanged,
  BeaconUpgraded,
  ClosePosition,
  DecreasePosition,
  IncreasePosition,
  Initialized,
  LiquidatePosition,
  OpenPosition,
  OwnershipTransferStarted,
  OwnershipTransferred,
  Upgraded
} from "../generated/Futures/Futures"

export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent())

  adminChangedEvent.parameters = new Array()

  adminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdmin",
      ethereum.Value.fromAddress(previousAdmin)
    )
  )
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  )

  return adminChangedEvent
}

export function createBeaconUpgradedEvent(beacon: Address): BeaconUpgraded {
  let beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent())

  beaconUpgradedEvent.parameters = new Array()

  beaconUpgradedEvent.parameters.push(
    new ethereum.EventParam("beacon", ethereum.Value.fromAddress(beacon))
  )

  return beaconUpgradedEvent
}

export function createClosePositionEvent(
  marketId: BigInt,
  positionId: BigInt,
  trader: Address,
  startedAt: BigInt,
  size: BigInt,
  collateral: BigInt,
  entryPrice: BigInt,
  liqPrice: BigInt,
  long: boolean,
  currentPrice: BigInt
): ClosePosition {
  let closePositionEvent = changetype<ClosePosition>(newMockEvent())

  closePositionEvent.parameters = new Array()

  closePositionEvent.parameters.push(
    new ethereum.EventParam(
      "marketId",
      ethereum.Value.fromUnsignedBigInt(marketId)
    )
  )
  closePositionEvent.parameters.push(
    new ethereum.EventParam(
      "positionId",
      ethereum.Value.fromUnsignedBigInt(positionId)
    )
  )
  closePositionEvent.parameters.push(
    new ethereum.EventParam("trader", ethereum.Value.fromAddress(trader))
  )
  closePositionEvent.parameters.push(
    new ethereum.EventParam(
      "startedAt",
      ethereum.Value.fromUnsignedBigInt(startedAt)
    )
  )
  closePositionEvent.parameters.push(
    new ethereum.EventParam("size", ethereum.Value.fromUnsignedBigInt(size))
  )
  closePositionEvent.parameters.push(
    new ethereum.EventParam(
      "collateral",
      ethereum.Value.fromUnsignedBigInt(collateral)
    )
  )
  closePositionEvent.parameters.push(
    new ethereum.EventParam(
      "entryPrice",
      ethereum.Value.fromUnsignedBigInt(entryPrice)
    )
  )
  closePositionEvent.parameters.push(
    new ethereum.EventParam(
      "liqPrice",
      ethereum.Value.fromUnsignedBigInt(liqPrice)
    )
  )
  closePositionEvent.parameters.push(
    new ethereum.EventParam("long", ethereum.Value.fromBoolean(long))
  )
  closePositionEvent.parameters.push(
    new ethereum.EventParam(
      "currentPrice",
      ethereum.Value.fromUnsignedBigInt(currentPrice)
    )
  )

  return closePositionEvent
}

export function createDecreasePositionEvent(
  marketId: BigInt,
  positionId: BigInt,
  trader: Address,
  startedAt: BigInt,
  size: BigInt,
  collateral: BigInt,
  entryPrice: BigInt,
  liqPrice: BigInt,
  long: boolean,
  currentPrice: BigInt
): DecreasePosition {
  let decreasePositionEvent = changetype<DecreasePosition>(newMockEvent())

  decreasePositionEvent.parameters = new Array()

  decreasePositionEvent.parameters.push(
    new ethereum.EventParam(
      "marketId",
      ethereum.Value.fromUnsignedBigInt(marketId)
    )
  )
  decreasePositionEvent.parameters.push(
    new ethereum.EventParam(
      "positionId",
      ethereum.Value.fromUnsignedBigInt(positionId)
    )
  )
  decreasePositionEvent.parameters.push(
    new ethereum.EventParam("trader", ethereum.Value.fromAddress(trader))
  )
  decreasePositionEvent.parameters.push(
    new ethereum.EventParam(
      "startedAt",
      ethereum.Value.fromUnsignedBigInt(startedAt)
    )
  )
  decreasePositionEvent.parameters.push(
    new ethereum.EventParam("size", ethereum.Value.fromUnsignedBigInt(size))
  )
  decreasePositionEvent.parameters.push(
    new ethereum.EventParam(
      "collateral",
      ethereum.Value.fromUnsignedBigInt(collateral)
    )
  )
  decreasePositionEvent.parameters.push(
    new ethereum.EventParam(
      "entryPrice",
      ethereum.Value.fromUnsignedBigInt(entryPrice)
    )
  )
  decreasePositionEvent.parameters.push(
    new ethereum.EventParam(
      "liqPrice",
      ethereum.Value.fromUnsignedBigInt(liqPrice)
    )
  )
  decreasePositionEvent.parameters.push(
    new ethereum.EventParam("long", ethereum.Value.fromBoolean(long))
  )
  decreasePositionEvent.parameters.push(
    new ethereum.EventParam(
      "currentPrice",
      ethereum.Value.fromUnsignedBigInt(currentPrice)
    )
  )

  return decreasePositionEvent
}

export function createIncreasePositionEvent(
  marketId: BigInt,
  positionId: BigInt,
  trader: Address,
  startedAt: BigInt,
  size: BigInt,
  collateral: BigInt,
  entryPrice: BigInt,
  liqPrice: BigInt,
  long: boolean,
  currentPrice: BigInt
): IncreasePosition {
  let increasePositionEvent = changetype<IncreasePosition>(newMockEvent())

  increasePositionEvent.parameters = new Array()

  increasePositionEvent.parameters.push(
    new ethereum.EventParam(
      "marketId",
      ethereum.Value.fromUnsignedBigInt(marketId)
    )
  )
  increasePositionEvent.parameters.push(
    new ethereum.EventParam(
      "positionId",
      ethereum.Value.fromUnsignedBigInt(positionId)
    )
  )
  increasePositionEvent.parameters.push(
    new ethereum.EventParam("trader", ethereum.Value.fromAddress(trader))
  )
  increasePositionEvent.parameters.push(
    new ethereum.EventParam(
      "startedAt",
      ethereum.Value.fromUnsignedBigInt(startedAt)
    )
  )
  increasePositionEvent.parameters.push(
    new ethereum.EventParam("size", ethereum.Value.fromUnsignedBigInt(size))
  )
  increasePositionEvent.parameters.push(
    new ethereum.EventParam(
      "collateral",
      ethereum.Value.fromUnsignedBigInt(collateral)
    )
  )
  increasePositionEvent.parameters.push(
    new ethereum.EventParam(
      "entryPrice",
      ethereum.Value.fromUnsignedBigInt(entryPrice)
    )
  )
  increasePositionEvent.parameters.push(
    new ethereum.EventParam(
      "liqPrice",
      ethereum.Value.fromUnsignedBigInt(liqPrice)
    )
  )
  increasePositionEvent.parameters.push(
    new ethereum.EventParam("long", ethereum.Value.fromBoolean(long))
  )
  increasePositionEvent.parameters.push(
    new ethereum.EventParam(
      "currentPrice",
      ethereum.Value.fromUnsignedBigInt(currentPrice)
    )
  )

  return increasePositionEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createLiquidatePositionEvent(
  marketId: BigInt,
  positionId: BigInt,
  trader: Address,
  startedAt: BigInt,
  size: BigInt,
  collateral: BigInt,
  entryPrice: BigInt,
  liqPrice: BigInt,
  long: boolean,
  currentPrice: BigInt
): LiquidatePosition {
  let liquidatePositionEvent = changetype<LiquidatePosition>(newMockEvent())

  liquidatePositionEvent.parameters = new Array()

  liquidatePositionEvent.parameters.push(
    new ethereum.EventParam(
      "marketId",
      ethereum.Value.fromUnsignedBigInt(marketId)
    )
  )
  liquidatePositionEvent.parameters.push(
    new ethereum.EventParam(
      "positionId",
      ethereum.Value.fromUnsignedBigInt(positionId)
    )
  )
  liquidatePositionEvent.parameters.push(
    new ethereum.EventParam("trader", ethereum.Value.fromAddress(trader))
  )
  liquidatePositionEvent.parameters.push(
    new ethereum.EventParam(
      "startedAt",
      ethereum.Value.fromUnsignedBigInt(startedAt)
    )
  )
  liquidatePositionEvent.parameters.push(
    new ethereum.EventParam("size", ethereum.Value.fromUnsignedBigInt(size))
  )
  liquidatePositionEvent.parameters.push(
    new ethereum.EventParam(
      "collateral",
      ethereum.Value.fromUnsignedBigInt(collateral)
    )
  )
  liquidatePositionEvent.parameters.push(
    new ethereum.EventParam(
      "entryPrice",
      ethereum.Value.fromUnsignedBigInt(entryPrice)
    )
  )
  liquidatePositionEvent.parameters.push(
    new ethereum.EventParam(
      "liqPrice",
      ethereum.Value.fromUnsignedBigInt(liqPrice)
    )
  )
  liquidatePositionEvent.parameters.push(
    new ethereum.EventParam("long", ethereum.Value.fromBoolean(long))
  )
  liquidatePositionEvent.parameters.push(
    new ethereum.EventParam(
      "currentPrice",
      ethereum.Value.fromUnsignedBigInt(currentPrice)
    )
  )

  return liquidatePositionEvent
}

export function createOpenPositionEvent(
  marketId: BigInt,
  positionId: BigInt,
  trader: Address,
  startedAt: BigInt,
  size: BigInt,
  collateral: BigInt,
  entryPrice: BigInt,
  liqPrice: BigInt,
  long: boolean,
  currentPrice: BigInt
): OpenPosition {
  let openPositionEvent = changetype<OpenPosition>(newMockEvent())

  openPositionEvent.parameters = new Array()

  openPositionEvent.parameters.push(
    new ethereum.EventParam(
      "marketId",
      ethereum.Value.fromUnsignedBigInt(marketId)
    )
  )
  openPositionEvent.parameters.push(
    new ethereum.EventParam(
      "positionId",
      ethereum.Value.fromUnsignedBigInt(positionId)
    )
  )
  openPositionEvent.parameters.push(
    new ethereum.EventParam("trader", ethereum.Value.fromAddress(trader))
  )
  openPositionEvent.parameters.push(
    new ethereum.EventParam(
      "startedAt",
      ethereum.Value.fromUnsignedBigInt(startedAt)
    )
  )
  openPositionEvent.parameters.push(
    new ethereum.EventParam("size", ethereum.Value.fromUnsignedBigInt(size))
  )
  openPositionEvent.parameters.push(
    new ethereum.EventParam(
      "collateral",
      ethereum.Value.fromUnsignedBigInt(collateral)
    )
  )
  openPositionEvent.parameters.push(
    new ethereum.EventParam(
      "entryPrice",
      ethereum.Value.fromUnsignedBigInt(entryPrice)
    )
  )
  openPositionEvent.parameters.push(
    new ethereum.EventParam(
      "liqPrice",
      ethereum.Value.fromUnsignedBigInt(liqPrice)
    )
  )
  openPositionEvent.parameters.push(
    new ethereum.EventParam("long", ethereum.Value.fromBoolean(long))
  )
  openPositionEvent.parameters.push(
    new ethereum.EventParam(
      "currentPrice",
      ethereum.Value.fromUnsignedBigInt(currentPrice)
    )
  )

  return openPositionEvent
}

export function createOwnershipTransferStartedEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferStarted {
  let ownershipTransferStartedEvent = changetype<OwnershipTransferStarted>(
    newMockEvent()
  )

  ownershipTransferStartedEvent.parameters = new Array()

  ownershipTransferStartedEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferStartedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferStartedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}
