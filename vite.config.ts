import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite' // Importa el plugin

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(), // <-- Añadido dentro del array
    ],
})