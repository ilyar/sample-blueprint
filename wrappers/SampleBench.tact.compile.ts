import { CompilerConfig } from '@ton/blueprint'

export const compile: CompilerConfig & { verbose?: number } = {
  lang: 'tact',
  target: 'contracts/SampleBench.tact',
}
