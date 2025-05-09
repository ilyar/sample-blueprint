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
    ],
};

export default config;
