import {
  AdminChanged as AdminChangedEvent,
  BeaconUpgraded as BeaconUpgradedEvent,
  ClosePosition as ClosePositionEvent,
  DecreasePosition as DecreasePositionEvent,
  IncreasePosition as IncreasePositionEvent,
  Initialized as InitializedEvent,
  LiquidatePosition as LiquidatePositionEvent,
  OpenPosition as OpenPositionEvent,
  OwnershipTransferStarted as OwnershipTransferStartedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Upgraded as UpgradedEvent
} from "../generated/Futures/Futures"
import {
  AdminChanged,
  BeaconUpgraded,
  Initialized,
  OwnershipTransferStarted,
  OwnershipTransferred,
  Position,
  PositionUpdate,
  Upgraded
} from "../generated/schema"

export function handleOpenPosition(event: OpenPositionEvent): void {
  // create Position entity
  let id = event.params.positionId.toString()
  let position = new Position(id)
  position.marketId = event.params.marketId
  position.trader = event.params.trader
  position.startedAt = event.params.startedAt
  position.size = event.params.size
  position.collateral = event.params.collateral
  position.entryPrice = event.params.entryPrice
  position.currentPrice = event.params.currentPrice
  position.liqPrice = event.params.liqPrice
  position.long = event.params.long
  position.blockNumber = event.block.number
  position.blockTimestamp = event.block.timestamp
  position.transactionHash = event.transaction.hash
  position.isClosed = false
  position.save()

  // create PositionUpdate entity
  let positionUpdate = new PositionUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  positionUpdate.updateType = "open"
  positionUpdate.size = event.params.size
  positionUpdate.collateral = event.params.collateral
  positionUpdate.entryPrice = event.params.entryPrice
  positionUpdate.currentPrice = event.params.currentPrice
  positionUpdate.liqPrice = event.params.liqPrice
  positionUpdate.startedAt = event.params.startedAt
  positionUpdate.blockNumber = event.block.number
  positionUpdate.blockTimestamp = event.block.timestamp
  positionUpdate.transactionHash = event.transaction.hash
  positionUpdate.position = id
  positionUpdate.save()
}

export function handleIncreasePosition(event: IncreasePositionEvent): void {
  // update Position entity
  let id = event.params.positionId.toString()
  let position = Position.load(id)
  position!.size = event.params.size
  position!.collateral = event.params.collateral
  position!.entryPrice = event.params.entryPrice
  position!.currentPrice = event.params.currentPrice
  position!.liqPrice = event.params.liqPrice
  position!.transactionHash = event.transaction.hash
  position!.save()

  // create PositionUpdate entity
  let positionUpdate = new PositionUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  positionUpdate.updateType = "inc-pos"
  positionUpdate.size = event.params.size
  positionUpdate.collateral = event.params.collateral
  positionUpdate.entryPrice = event.params.entryPrice
  positionUpdate.currentPrice = event.params.currentPrice
  positionUpdate.liqPrice = event.params.liqPrice
  positionUpdate.startedAt = event.params.startedAt
  positionUpdate.blockNumber = event.block.number
  positionUpdate.blockTimestamp = event.block.timestamp
  positionUpdate.transactionHash = event.transaction.hash
  positionUpdate.position = id
  positionUpdate.save()
}

export function handleDecreasePosition(event: DecreasePositionEvent): void {
  // update Position entity
  let id = event.params.positionId.toString()
  let position = Position.load(id)
  position!.size = event.params.size
  position!.collateral = event.params.collateral
  position!.entryPrice = event.params.entryPrice
  position!.currentPrice = event.params.currentPrice
  position!.liqPrice = event.params.liqPrice
  position!.transactionHash = event.transaction.hash
  position!.save()

  // create PositionUpdate entity
  let positionUpdate = new PositionUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  positionUpdate.updateType = "dec-pos"
  positionUpdate.size = event.params.size
  positionUpdate.collateral = event.params.collateral
  positionUpdate.entryPrice = event.params.entryPrice
  positionUpdate.currentPrice = event.params.currentPrice
  positionUpdate.liqPrice = event.params.liqPrice
  positionUpdate.startedAt = event.params.startedAt
  positionUpdate.blockNumber = event.block.number
  positionUpdate.blockTimestamp = event.block.timestamp
  positionUpdate.transactionHash = event.transaction.hash
  positionUpdate.position = id
  positionUpdate.save()
}

export function handleClosePosition(event: ClosePositionEvent): void {
  // update Position entity
  let id = event.params.positionId.toString()
  let position = Position.load(id)
  position!.size = event.params.size
  position!.collateral = event.params.collateral
  position!.entryPrice = event.params.entryPrice
  position!.currentPrice = event.params.currentPrice
  position!.liqPrice = event.params.liqPrice
  position!.transactionHash = event.transaction.hash
  position!.isClosed = true
  position!.save()

  // create PositionUpdate entity
  let positionUpdate = new PositionUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  positionUpdate.updateType = "close"
  positionUpdate.size = event.params.size
  positionUpdate.collateral = event.params.collateral
  positionUpdate.entryPrice = event.params.entryPrice
  positionUpdate.currentPrice = event.params.currentPrice
  positionUpdate.liqPrice = event.params.liqPrice
  positionUpdate.startedAt = event.params.startedAt
  positionUpdate.blockNumber = event.block.number
  positionUpdate.blockTimestamp = event.block.timestamp
  positionUpdate.transactionHash = event.transaction.hash
  positionUpdate.position = id
  positionUpdate.save()
}

export function handleLiquidatePosition(event: LiquidatePositionEvent): void {
  // update Position entity
  let id = event.params.positionId.toString()
  let position = Position.load(id)
  position!.size = event.params.size
  position!.collateral = event.params.collateral
  position!.entryPrice = event.params.entryPrice
  position!.currentPrice = event.params.currentPrice
  position!.liqPrice = event.params.liqPrice
  position!.transactionHash = event.transaction.hash
  position!.isClosed = true
  position!.save()

  // create PositionUpdate entity
  let positionUpdate = new PositionUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  positionUpdate.updateType = "liq"
  positionUpdate.size = event.params.size
  positionUpdate.collateral = event.params.collateral
  positionUpdate.entryPrice = event.params.entryPrice
  positionUpdate.currentPrice = event.params.currentPrice
  positionUpdate.liqPrice = event.params.liqPrice
  positionUpdate.startedAt = event.params.startedAt
  positionUpdate.blockNumber = event.block.number
  positionUpdate.blockTimestamp = event.block.timestamp
  positionUpdate.transactionHash = event.transaction.hash
  positionUpdate.position = id
  positionUpdate.save()
}

/** -------------------------------------------------------------------------------------------- */


export function handleAdminChanged(event: AdminChangedEvent): void {
  let entity = new AdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousAdmin = event.params.previousAdmin
  entity.newAdmin = event.params.newAdmin

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBeaconUpgraded(event: BeaconUpgradedEvent): void {
  let entity = new BeaconUpgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.beacon = event.params.beacon

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferStarted(
  event: OwnershipTransferStartedEvent
): void {
  let entity = new OwnershipTransferStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpgraded(event: UpgradedEvent): void {
  let entity = new Upgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.implementation = event.params.implementation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
