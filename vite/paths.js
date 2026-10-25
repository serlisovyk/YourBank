import { resolve } from 'node:path'

export const ROOT = resolve(import.meta.dirname, '..')
export const SRC = resolve(ROOT, 'src')
export const DIST = resolve(ROOT, 'dist')
export const PUBLIC = resolve(ROOT, 'public')
export const PARTIALS = resolve(SRC, 'partials')
export const PAGES = {
  index: resolve(SRC, 'index.html'),
  about: resolve(SRC, 'about.html'),
  careers: resolve(SRC, 'careers.html'),
  security: resolve(SRC, 'security.html'),
}
