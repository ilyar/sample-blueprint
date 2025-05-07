import '@ton/test-utils'
import { Cell, toNano } from '@ton/core'
import { compile } from '@ton/blueprint'
import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox'
import { SampleBench } from '../wrappers/SampleBench'

describe('SampleBench', () => {
  const compiler = process.env.TON_COMPILER || 'func'
  let code: Cell
  let blockchain: Blockchain
  let deployer: SandboxContract<TreasuryContract>
  let user: SandboxContract<TreasuryContract>
  let app: SandboxContract<SampleBench>

  beforeAll(async () => {
    code = await compile(`SampleBench.${compiler}`)
    blockchain = await Blockchain.create()
    app = blockchain.openContract(SampleBench.createFromConfig(code))
    deployer = await blockchain.treasury('deployer')
    user = await blockchain.treasury('user')
    const out = await app.sendDeploy(deployer.getSender(), toNano('0.05'))
    expect(out.transactions).toHaveTransaction({
      from: deployer.address,
      to: app.address,
      deploy: true,
      success: true,
    })
  })

  it(`${compiler} - should deploy`, async () => {
    expect(await app.getState()).toStrictEqual({ id: 0, counter: 0 })
  })

  it(`${compiler} - should sent incrAction`, async () => {
    const before = await app.getState()
    const change = Math.floor(Math.random() * 255)
    const result = await app.sendIncrAction(
      user.getSender(),
      {
        change,
      },
      toNano('0.05'),
    )
    expect(result.transactions).toHaveTransaction({
      from: user.address,
      to: app.address,
      success: true,
    })
    const after = await app.getState()
    expect(after.counter).toBe(before.counter + change)
  })

  it(`${compiler} - should sent sendDecrAction`, async () => {
    const before = await app.getState()
    const change = Math.floor(Math.random() * 255)
    const result = await app.sendDecrAction(
      user.getSender(),
      {
        change,
      },
      toNano('0.05'),
    )
    expect(result.transactions).toHaveTransaction({
      from: user.address,
      to: app.address,
      success: true,
    })
    const after = await app.getState()
    expect(after.counter).toBe(before.counter - change)
  })
})
