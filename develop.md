# Sample Blueprint

## Project structure

-   `contracts` - source code of all the smart contracts of the project and their dependencies
-   `contracts/lib/*.auto.*` - automatically generated from `contracts/*.tlb`
-   `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts
-   `tests` - tests for the contracts
-   `scripts` - scripts used by the project, mainly the deployment scripts

## How to use

```bash
pnpm install
pnpm lint
pnpm format
pnpm build-all
pnpm test
```

### Deploy or run another script

```bash
npx blueprint run
```

### Add a new contract

```bash
npx blueprint create ContractName
```
