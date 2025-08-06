import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    }
  },
  // base: '/static/'
})

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   css: {
//     preprocessorOptions: {
//       scss: {
//         additionalData: `@import "./src/styles/main.scss";`
//       }
//     }
//   }
// });
