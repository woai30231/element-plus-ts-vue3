import { defineConfig ,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
// import {fileURLToPath,URL} from 'url'
import {resolve} from 'path';
const env = loadEnv('',process.cwd());
import fs from 'fs';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'force-clean',
      buildStart() {
        if (fs.existsSync('./dist')) fs.rmSync('./dist', { recursive: true })
      }
    }
  ],
  resolve:{
    alias:{
      // "@":fileURLToPath(new URL('./src',import.meta.url))
      "@":resolve(__dirname,'./src')
    },
  },
  build:{
    outDir:resolve(process.cwd(),'dist/vue-app'),
    emptyOutDir:true
  },
  base:env.VITE_BASE_PATH,
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
