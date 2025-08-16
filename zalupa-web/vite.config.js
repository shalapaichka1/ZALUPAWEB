import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Загружаем переменные окружения
  const env = loadEnv(mode, process.cwd())

  // Доступ к переменным окружения
  const apiKey = env.VITE_API_KEY
  const apiUrl = env.VITE_API_URL

  return {
    server: {
      hmr: true,
      match: {
        usePolling:true
      }
    },
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // Здесь вы можете использовать apiKey и apiUrl по необходимости
    // Например, добавить их в define для доступа в коде приложения:
    define: {
      'process.env': {
        VITE_API_KEY: JSON.stringify(apiKey),
        VITE_API_URL: JSON.stringify(apiUrl)
      }
    }
  }
})