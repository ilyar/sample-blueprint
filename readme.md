# 👨🏻‍🔬 Sample Blueprint

Sample Blueprint with tests, benchmark and automatically generated code see [develop.md](develop.md) and [contributing.md](contributing.md) 🤗

## Example collect metric

**Build `@ton-sandbox-bech` and `@ton-blueprint-bech`:**

```bash
git clone --branch=feature/betch git@github.com:ton-org/sandbox.git sandbox-bench
cd sandbox-bench
yarn && yarn build && yarn pack --out dist/%s-bech.tgz && cd ..

git clone --branch=feature/betch git@github.com:ton-org/blueprint.git blueprint-bench
cd blueprint-bench
yarn && yarn build && yarn pack --out dist/%s-bech.tgz && cd ..

git clone git@github.com:ilyar/sample-blueprint.git
cd sample-blueprint
pnpm add -D ../sandbox-bench/dist/@ton-sandbox-bech.tgz ../blueprint-bench/dist/@ton-blueprint-bech.tgz
```

**Setup `jest.config.ts`:**

```ts
import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: '@ton/sandbox/jest-environment',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    reporters: [
        'default',
        ['@ton/sandbox/jest-reporter', {
            contractDatabase: 'abi.json',
            reportName: '.benchmark',
            mode: 'onlyMetric',
            contractExcludes: [
                'TreasuryContract',
            ],
        }],
    ],
};

export default config;
```

**Run tests and collect metric:**

```bash
TON_COMPILER=tact npx blueprint snapshot -l "tact v1.6.7"
TON_COMPILER=func npx blueprint snapshot -l "func v0.9.1"
# or
for v in 0.{6..11}.0; do pnpm add -D "@ton/tolk-js@$v" && npx blueprint snapshot -l "tolk v$v"; done
```

**Get benchmark:**

```bash
npx blueprint test --gas-report
```

🧙🏻‍♂️ See result [.benchmark](.benchmark)
