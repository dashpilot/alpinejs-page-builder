// vite.config.js
import { defineConfig } from 'vite';
import convertComponentsPlugin from './vite-plugin-convert-components';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [convertComponentsPlugin(), tailwindcss()],
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
            },
            output: {
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name].[ext]',
            },
        },
    },
});
