import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '/@': path.resolve(__dirname,'src'),
      comps: path.resolve(__dirname, 'src/component')
    }
  },
  plugins: [vue()]
})
