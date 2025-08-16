import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import {fileURLToPath,URL} from 'url'
import {resolve} from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      // "@":fileURLToPath(new URL('./src',import.meta.url))
      "@":resolve(__dirname,'./src')
    },
  },
  base:'vue-app',
  server:{
    port:5166,
    proxy:{
      '/api':{
        target:'http://127.0.0.1:6753',
        changeOrigin:true,
        // rewrite:(path)=>path.replace(/^\/api/, '')
      },
      "/test":{
        target:"http://127.0.0.1:6753",
        changeOrigin:true
      },
      "/token":{
        target:"http://127.0.0.1:6753",
        changeOrigin:true
      }
    }
  }
  
})
