export function getImageOptimizerOptions() {
  return {
    jpg: { quality: 80 },
    webp: { quality: 80 },
    avif: { quality: 75 },
    svg: {
      multipass: true,
      plugins: ['preset-default'],
    },
  }
}
