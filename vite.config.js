import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// ❗ devtools ТОЛЬКО локально
const plugins = [vue()]

// if (process.env.NODE_ENV !== 'production') {
//   const { default: vueDevtools } = await import('vite-plugin-vue-devtools')
//   plugins.push(vueDevtools())
// }

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
