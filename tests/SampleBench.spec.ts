import '@ton/test-utils'
import { Cell, toNano } from '@ton/core'
import { compile } from '@ton/blueprint'
import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox'
import { SampleBench } from '../wrappers/SampleBench'

describe.each(['func', 'tolk', 'tact'])('SampleBench', (compiler: string) => {
  let code: Cell
  let blockchain: Blockchain
  let deployer: SandboxContract<TreasuryContract>
  let app: SandboxContract<SampleBench>

  beforeAll(async () => {
    code = await compile(`SampleBench.${compiler}`)
    blockchain = await Blockchain.create()
    app = blockchain.openContract(SampleBench.createFromConfig(code))
    deployer = await blockchain.treasury('deployer')
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

  it.each(Object.keys(Array.from({ length: 100 })))(`${compiler} - should sent action via account#%i`, async (n) => {
    const account = await blockchain.treasury(`account#${n}`)
    const before = await app.getState()
    const change = Math.floor(Math.random() * 255)
    const { action, expected } =
      Math.floor(Math.random() * 10) > 5
        ? { action: app.sendIncrAction, expected: before.counter + change }
        : { action: app.sendDecrAction, expected: before.counter - change }
    const out = await action(
      account.getSender(),
      {
        change,
      },
      toNano('0.05'),
    )
    expect(out.transactions).toHaveTransaction({
      from: account.address,
      to: app.address,
      success: true,
    })
    const after = await app.getState()
    expect(after.counter).toBe(expected)
  })
})
