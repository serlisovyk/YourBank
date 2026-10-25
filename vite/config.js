import { defineConfig } from 'vite'
import { getBuild } from './parts/build.js'
import { getPlugins } from './parts/plugins.js'
import { PUBLIC, SRC } from './paths.js'

export default defineConfig({
  root: SRC,
  publicDir: PUBLIC,
  build: getBuild(),
  plugins: getPlugins(),
})
