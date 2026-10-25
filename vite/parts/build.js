import { DIST, PAGES } from '../paths.js'

export function getBuild() {
  return {
    outDir: DIST,
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: { input: PAGES },
  }
}
