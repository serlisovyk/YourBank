import { copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'

export function copyIndexTo404() {
  let outDir = ''

  return {
    name: 'copy-index-to-404',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      await copyFile(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    },
  }
}
