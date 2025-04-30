import { Address, toNano } from '@ton/core'
import { NetworkProvider, sleep } from '@ton/blueprint'
import { SampleBench } from '../wrappers/SampleBench'

export async function run(provider: NetworkProvider, args: string[]) {
  const ui = provider.ui()
  const address = Address.parse(args.length > 0 ? args[0] : await ui.input('address'))
  if (!(await provider.isContractDeployed(address))) {
    ui.write(`Error: Contract at address ${address} is not deployed!`)
    return
  }
  const app = provider.open(SampleBench.createFromAddress(address))
  const counterBefore = await app.getState()
  await app.sendIncrAction(
    provider.sender(),
    {
      change: 1,
    },
    toNano('0.05'),
  )
  ui.write('Waiting for counter to increase...')
  let counterAfter = await app.getState()
  let attempt = 1
  while (counterAfter.counter === counterBefore.counter) {
    ui.setActionPrompt(`Attempt ${attempt}`)
    await sleep(2000)
    counterAfter = await app.getState()
    attempt++
  }
  ui.clearActionPrompt()
  ui.write('Counter increased successfully!')
}
