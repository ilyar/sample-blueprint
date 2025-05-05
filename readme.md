# 👨🏻‍🔬 Sample Blueprint

Sample Blueprint with tests, benchmark and automatically generated code see [develop.md](develop.md) and [contributing.md](contributing.md) 🤗

## Example collect metric

**Build `@ton-sandbox-0.29.0-bech` and `@ton-blueprint-0.31.1-bech`:**

```bash
git clone --branch=feature/betch git@github.com:ton-org/sandbox.git sandbox-bench
cd sandbox-bench
npm version minor --no-git-tag-version 
yarn && yarn build && yarn pack --out dist/%s-%v-bech.tgz && cd ..

git clone --branch=feature/betch git@github.com:ton-org/blueprint.git blueprint-bench
cd blueprint-bench
yarn add -D ../sandbox-bench/dist/@ton-sandbox-0.29.0-bech.tgz
yarn && yarn build && yarn pack --out dist/%s-%v-bech.tgz && cd ..

git clone git@github.com:ilyar/sample-blueprint.git
cd sample-blueprint
pnpm add -D ../sandbox-bench/dist/@ton-sandbox-0.29.0-bech.tgz ../blueprint-bench/dist/@ton-blueprint-0.31.1-bech.tgz
```

**Setup `jest.config.t`:**

```patch
--- a/jest.config.ts
+++ b/jest.config.ts
@@ -2,8 +2,15 @@ import type { Config } from 'jest';
 
 const config: Config = {
     preset: 'ts-jest',
-    testEnvironment: 'node',
+    testEnvironment: '@ton/blueprint/jest-environment',
     testPathIgnorePatterns: ['/node_modules/', '/dist/'],
+    reporters: [
+        ['@ton/blueprint/jest-reporter', {
+            reportName: '.benchmark',
+            mode: 'onlyMetric',
+            contractExcludes: ['TreasuryContract'],
+        }],
+    ],
 };
 
 export default config;
```

**Run tests and collect metric:**

```bash
TON_COMPILER=tact npx blueprint metric -c "tact"
TON_COMPILER=func npx blueprint metric -c "func"
TON_COMPILER=tolk npx blueprint metric -c "tolk"
```

🧙🏻‍♂️ See result [.benchmark](.benchmark)
