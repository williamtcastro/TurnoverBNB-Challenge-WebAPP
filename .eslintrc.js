module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'react/prop-types': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    // 'no-console': ['error', { allow: ['tron'] }],
  },
};

// // .eslintrc.jsmodule.exports = {
//   env: {
//     browser: true,
//     es6: true
//   },
//   extends: ["airbnb", "prettier", "prettier/react"],
//   globals: {
//     Atomics: "readonly",
//     SharedArrayBuffer: "readonly",
//     __DEV__: 'readonly'
//   },
//   parser: "babel-eslint",
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true
//     },
//     ecmaVersion: 2018,
//     sourceType: "module"
//   },
//   plugins: ["react", "prettier"],
//   rules: {
//     "prettier/prettier": "error",
//     "react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".js"] }],
//     "import/prefer-default-export": "off",
//     "no-param-reassign": "off",
//     "no-console": ["error", { allow: ["tron"] }]
//   }
// }
