import { defineConfig } from 'vite'
import { getBuild } from './parts/build.js'
import { getPlugins } from './parts/plugins.js'
import { PUBLIC, SRC } from './paths.js'

export default defineConfig({
  root: SRC,
  appType: 'mpa',
  publicDir: PUBLIC,
  build: getBuild(),
  plugins: getPlugins(),
})
