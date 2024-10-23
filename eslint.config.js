import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactRefresh from 'eslint-plugin-react-refresh';

export default [
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      'react-refresh': pluginReactRefresh
    },
    rules: {
      'react-refresh/only-export-components': 'warn',
      'react/react-in-jsx-scope': 'off' // 제가 임의로 추가함.
    }
  },
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  {
    ignores: ['dist', 'eslint.config.js']
  }
];
