module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json'
        }
    },
    moduleFileExtensions: [
        'ts',
        'js'
    ],
    testEnvironment: 'node',
    testMatch: [
        '**/*.spec.ts'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    }
};
