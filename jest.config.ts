export default {
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
    '.+\\.ts$': 'ts-jest'
  }

