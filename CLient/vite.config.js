
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   server: {
//     port: 5173,
//     proxy: {
//       '/Api': {
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => {
//           console.log('Proxying:', path); // Debug log
//           return path;
//         }
//       },
//     },
//   },
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
//   "compilerOptions": {
//     "baseUrl": ".",
//     "paths": {
//       "@/*": ["./src/*"]
//     }
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      '/Api': {
        target: process.env.NODE_ENV === 'production' 
          ? 'https://mokiekie.onrender.com' 
          : 'http://localhost:3000',
        changeOrigin: true,
        secure: true, // Set to true for HTTPS
        rewrite: (path) => {
          console.log('Proxying:', path);
          return path;
        }
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Note: compilerOptions should be in tsconfig.json, not here
})