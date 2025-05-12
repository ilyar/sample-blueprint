import config from './jest.config';

config.testEnvironment = '@ton/sandbox/jest-environment'
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
