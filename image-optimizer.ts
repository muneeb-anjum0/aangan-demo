import viteImagemin from 'vite-plugin-imagemin';

export const imageOptimizer = viteImagemin({
  gifsicle: { optimizationLevel: 7, interlaced: false },
  optipng: { optimizationLevel: 7 },
  mozjpeg: { quality: 75 },
  pngquant: { quality: [0.65, 0.9], speed: 4 },
  svgo: {
    plugins: [
      { name: 'removeViewBox' },
      { name: 'removeEmptyAttrs', active: false },
    ],
  },
});
