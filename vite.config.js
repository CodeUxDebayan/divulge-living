import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [],
    server: { port: 5173, open: false },
    build: {
        outDir: 'dist',
        assetsInlineLimit: 0,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                products: resolve(__dirname, 'products.html'),
            },
        },
    },
});
