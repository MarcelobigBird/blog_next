import { readFileSync } from 'fs';

const swcConfig = JSON.parse(readFileSync('./.swcrc', 'utf8'));

export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.mjs'],
  moduleNameMapper: {
    // Mapeamento para aliases do Next.js (se você usa aliases no tsconfig.json)
    '^@/(.*)$': '<rootDir>/$1',
    // Mocks para arquivos estáticos
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js'
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['@swc/jest', swcConfig],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
};
