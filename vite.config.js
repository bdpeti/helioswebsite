import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        outDir: 'assets',
        emptyOutDir: false, // Don't delete other assets in the folder
        rollupOptions: {
            input: {
                main: 'src/main.js',
                style: 'src/style.css'
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name].[ext]'
            }
        }
    }
})
