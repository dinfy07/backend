import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// ❗ devtools ТОЛЬКО локально
const plugins = [vue()]

if (process.env.NODE_ENV !== 'production') {
  const { default: vueDevtools } = await import('vite-plugin-vue-devtools')
  plugins.push(vueDevtools())
}

export default defineConfig({
  plugins
})
