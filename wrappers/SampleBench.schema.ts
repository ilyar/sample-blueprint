import { Builder } from '@ton/core'
import { Slice } from '@ton/core'
import { beginCell } from '@ton/core'
import { BitString } from '@ton/core'
import { Cell } from '@ton/core'
import { Address } from '@ton/core'
import { ExternalAddress } from '@ton/core'
import { Dictionary } from '@ton/core'
import { DictionaryValue } from '@ton/core'
import { TupleItem } from '@ton/core'
import { parseTuple } from '@ton/core'
import { serializeTuple } from '@ton/core'
export function bitLen(n: number) {
  return n.toString(2).length
}

export interface Bool {
  readonly kind: 'Bool'
  readonly value: boolean
}

export function loadBool(slice: Slice): Bool {
  if (slice.remainingBits >= 1) {
    let value = slice.loadUint(1)
    return {
      kind: 'Bool',
      value: value == 1,
    }
  }
  throw new Error('Expected one of "BoolFalse" in loading "BoolFalse", but data does not satisfy any constructor')
}

export function storeBool(bool: Bool): (builder: Builder) => void {
  return (builder: Builder) => {
    builder.storeUint(bool.value ? 1 : 0, 1)
  }
}

export function loadBoolFalse(slice: Slice): Bool {
  if (slice.remainingBits >= 1 && slice.preloadUint(1) == 0b0) {
    slice.loadUint(1)
    return {
      kind: 'Bool',
      value: false,
    }
  }
  throw new Error('Expected one of "BoolFalse" in loading "BoolFalse", but data does not satisfy any constructor')
}

export function loadBoolTrue(slice: Slice): Bool {
  if (slice.remainingBits >= 1 && slice.preloadUint(1) == 0b1) {
    slice.loadUint(1)
    return {
      kind: 'Bool',
      value: true,
    }
  }
  throw new Error('Expected one of "BoolTrue" in loading "BoolTrue", but data does not satisfy any constructor')
}

export function copyCellToBuilder(from: Cell, to: Builder): void {
  let slice = from.beginParse()
  to.storeBits(slice.loadBits(slice.remainingBits))
  while (slice.remainingRefs) {
    to.storeRef(slice.loadRef())
  }
}
// _ id:uint32 counter:int32 = State;

export interface State {
  readonly kind: 'State'
  readonly id: number
  readonly counter: number
}

// action_incr#49533468 queryId:uint64 change:uint8 = IncrAction;

export interface IncrAction {
  readonly kind: 'IncrAction'
  readonly queryId: bigint
  readonly change: number
}

// action_decr#0ee52db3 queryId:uint64 change:uint8 = DecrAction;

export interface DecrAction {
  readonly kind: 'DecrAction'
  readonly queryId: bigint
  readonly change: number
}

// _ _:IncrAction = Action;

// _ _:DecrAction = Action;

export type Action = Action__ | Action__1

export interface Action__ {
  readonly kind: 'Action__'
  readonly _: IncrAction
}

export interface Action__1 {
  readonly kind: 'Action__1'
  readonly _: DecrAction
}

// get_state#12f15 result:State = GetState;

export interface GetState {
  readonly kind: 'GetState'
  readonly result: State
}

// _ _:GetState = Gertter;

export interface Gertter {
  readonly kind: 'Gertter'
  readonly _: GetState
}

// _ id:uint32 counter:int32 = State;

export function loadState(slice: Slice): State {
  let id: number = slice.loadUint(32)
  let counter: number = slice.loadInt(32)
  return {
    kind: 'State',
    id: id,
    counter: counter,
  }
}

export function storeState(state: State): (builder: Builder) => void {
  return (builder: Builder) => {
    builder.storeUint(state.id, 32)
    builder.storeInt(state.counter, 32)
  }
}

// action_incr#49533468 queryId:uint64 change:uint8 = IncrAction;

export function loadIncrAction(slice: Slice): IncrAction {
  if (slice.remainingBits >= 32 && slice.preloadUint(32) == 0x49533468) {
    slice.loadUint(32)
    let queryId: bigint = slice.loadUintBig(64)
    let change: number = slice.loadUint(8)
    return {
      kind: 'IncrAction',
      queryId: queryId,
      change: change,
    }
  }
  throw new Error('Expected one of "IncrAction" in loading "IncrAction", but data does not satisfy any constructor')
}

export function storeIncrAction(incrAction: IncrAction): (builder: Builder) => void {
  return (builder: Builder) => {
    builder.storeUint(0x49533468, 32)
    builder.storeUint(incrAction.queryId, 64)
    builder.storeUint(incrAction.change, 8)
  }
}

// action_decr#0ee52db3 queryId:uint64 change:uint8 = DecrAction;

export function loadDecrAction(slice: Slice): DecrAction {
  if (slice.remainingBits >= 32 && slice.preloadUint(32) == 0x0ee52db3) {
    slice.loadUint(32)
    let queryId: bigint = slice.loadUintBig(64)
    let change: number = slice.loadUint(8)
    return {
      kind: 'DecrAction',
      queryId: queryId,
      change: change,
    }
  }
  throw new Error('Expected one of "DecrAction" in loading "DecrAction", but data does not satisfy any constructor')
}

export function storeDecrAction(decrAction: DecrAction): (builder: Builder) => void {
  return (builder: Builder) => {
    builder.storeUint(0x0ee52db3, 32)
    builder.storeUint(decrAction.queryId, 64)
    builder.storeUint(decrAction.change, 8)
  }
}

// _ _:IncrAction = Action;

// _ _:DecrAction = Action;

export function loadAction(slice: Slice): Action {
  if (true) {
    let _: IncrAction = loadIncrAction(slice)
    return {
      kind: 'Action__',
      _: _,
    }
  }
  if (true) {
    let _: DecrAction = loadDecrAction(slice)
    return {
      kind: 'Action__1',
      _: _,
    }
  }
  throw new Error(
    'Expected one of "Action__", "Action__1" in loading "Action", but data does not satisfy any constructor',
  )
}

export function storeAction(action: Action): (builder: Builder) => void {
  if (action.kind == 'Action__') {
    return (builder: Builder) => {
      storeIncrAction(action._)(builder)
    }
  }
  if (action.kind == 'Action__1') {
    return (builder: Builder) => {
      storeDecrAction(action._)(builder)
    }
  }
  throw new Error(
    'Expected one of "Action__", "Action__1" in loading "Action", but data does not satisfy any constructor',
  )
}

// get_state#12f15 result:State = GetState;

export function loadGetState(slice: Slice): GetState {
  if (slice.remainingBits >= 20 && slice.preloadUint(20) == 0x12f15) {
    slice.loadUint(20)
    let result: State = loadState(slice)
    return {
      kind: 'GetState',
      result: result,
    }
  }
  throw new Error('Expected one of "GetState" in loading "GetState", but data does not satisfy any constructor')
}

export function storeGetState(getState: GetState): (builder: Builder) => void {
  return (builder: Builder) => {
    builder.storeUint(0x12f15, 20)
    storeState(getState.result)(builder)
  }
}

// _ _:GetState = Gertter;

export function loadGertter(slice: Slice): Gertter {
  let _: GetState = loadGetState(slice)
  return {
    kind: 'Gertter',
    _: _,
  }
}

export function storeGertter(gertter: Gertter): (builder: Builder) => void {
  return (builder: Builder) => {
    storeGetState(gertter._)(builder)
  }
}
