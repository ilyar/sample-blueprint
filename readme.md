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
            contractExcludes: [
                'TreasuryContract',
            ],
        }],
    ]
};

export default config;
```

**Run tests and collect metric:**

```bash
npx blueprint snapshot -l "some label"
```

**Get report:**

```bash
npx blueprint test --gas-report
```

**Or setup `gas-report.config.ts`:**

```ts
import config from './jest.config';

config.testEnvironment = '@ton/sandbox/jest-environment'
config.reporters = [
    ['@ton/sandbox/jest-reporter', {
        contractDatabase: 'abi.json',
        contractExcludes: [
            'TreasuryContract',
        ],
    }],
]
export default config;
```

**Run tests and collect metric:**

```bash
npx blueprint snapshot -l "some label" -- --config gas-report.config.ts
```

**Get report:**

```bash
npx blueprint test --gas-report -- --config gas-report.config.ts
# or
pnpm gas-report
```

🧙🏻‍♂️ See result [.benchmark](.snapshot) and [gas-report.json](gas-report.json)
