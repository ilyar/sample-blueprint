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
TON_COMPILER=tact npx blueprint metric -c "tact v1.6.7"
TON_COMPILER=func npx blueprint metric -c "func v0.4.6"
TON_COMPILER=tolk npx blueprint metric -c "tolk v0.11.0"
```

🧙🏻‍♂️ See result [.benchmark](.benchmark)
