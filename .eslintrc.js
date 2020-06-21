const tsconfig = require('./tsconfig.json');

const createEslintModuleMapsForLinting = () => {
  const resp = Object.entries(tsconfig.compilerOptions.paths).map(([k, [v]]) => [
    k,
    `./src/${v.replace(/\*/, '')}`,
  ]);
  return resp;
};

const moduleNameMapper = createEslintModuleMapsForLinting();

module.exports = {
  extends: ['airbnb', 'airbnb-typescript/base', 'prettier'],
  plugins: ['import','prettier', 'jest'],
  rules: {
    'prettier/prettier': ['error'],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'default', format: ['camelCase'] },
      { selector: 'typeLike', format: ['PascalCase'] },
    ],
    'no-console': 'off',
  },
  env: {
    'jest/globals': true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    "import/resolver": {
      // use <root>/tsconfig.json
      "typescript": {
        "alwaysTryTypes": true // always try to resolve types under `<roo/>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
      // use an array
      "typescript": {
        "directory": [
          "./tsconfig.json",
          "./test/tsconfig.json"
        ]
      },
    }
    // 'import/resolver': {
    //   typescript: {},
    //   // alias: {
    //   //   map: moduleNameMapper,
    //   //   extensions: ['.ts', '.js', '.jsx', '.json'],
    //   // },
    // },
  },
};
