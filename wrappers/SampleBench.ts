import { Address, beginCell, Cell } from '@ton/core'
import { Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core'
import { State, Action } from '../contracts/lib/SampleBench.auto'

export function sampleBenchState(state?: State): Cell {
  state = state || { id: 0, counter: 0 }
  return beginCell().storeUint(state.id, 32).storeInt(state.counter, 32).endCell()
}

export class SampleBench implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell },
  ) {}

  static createFromAddress(address: Address) {
    return new SampleBench(address)
  }

  static createFromConfig(code: Cell, state?: State, workchain = 0) {
    const data = sampleBenchState(state)
    const init = { code, data }
    return new SampleBench(contractAddress(workchain, init), init)
  }

  async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().endCell(),
    })
  }

  async sendIncrAction(
    provider: ContractProvider,
    via: Sender,
    param: {
      queryID?: number
      change: number
    },
    value: bigint,
  ) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(Action.Incr, 32)
        .storeUint(param.queryID ?? 0, 64)
        .storeUint(param.change, 8)
        .endCell(),
    })
  }

  async sendDecrAction(
    provider: ContractProvider,
    via: Sender,
    param: {
      queryID?: number
      change: number
    },
    value: bigint,
  ) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(Action.Decr, 32)
        .storeUint(param.queryID ?? 0, 64)
        .storeUint(param.change, 8)
        .endCell(),
    })
  }

  async getState(provider: ContractProvider) {
    const result = await provider.get('state', [])
    return {
      id: result.stack.readNumber(),
      counter: result.stack.readNumber(),
    }
  }
}
