import { toNano } from '@ton/core'
import { compile, NetworkProvider } from '@ton/blueprint'
import { SampleBench } from '../wrappers/SampleBench'

export async function run(provider: NetworkProvider, args: string[]) {
  const ui = provider.ui()
  const compiler = args.length > 0 ? args[0] : await ui.input('compiler')
  const app = provider.open(
    SampleBench.createFromConfig(await compile(`SampleBench.${compiler}`), {
      id: Math.floor(Math.random() * 10000),
      counter: 0,
    }),
  )
  await app.sendDeploy(provider.sender(), toNano('0.05'))
  await provider.waitForDeploy(app.address)
  console.log(`Deployed implementation ${compiler} at ${app.address.toString()}`)
  console.log('State:', await app.getState())
}
