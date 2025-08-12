// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   server: {
//     proxy: {
//       '/Api': {
//         target: 'http://localhost:3000',
//         secure: false,
//       },
//     },
//   },
//   plugins: [react(),
//     tailwindcss(),
//   ],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      '/Api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          console.log('Proxying:', path); // Debug log
          return path;
        }
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})