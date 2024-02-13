import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
  plugins: [vue()],
  server:{
    proxy:{
      '/api': {
        target: 'https://rmxtfurm45mw01.amocrm.ru',
        changeOrigin: true,
        secure: false,
      },
      '/token': {
        target: 'https://test.gnzs.ru/oauth/get-token.php',
        rewrite:(path) => path.replace(/^\/token/, ''),
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
