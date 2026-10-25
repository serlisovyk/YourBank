import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
  { ignores: ['dist', '.claude'] },
  js.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['vite.config.js', 'vite/**/*.js', 'eslint.config.js'],
    languageOptions: { globals: globals.node },
  },
  prettier,
]
