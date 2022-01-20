const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
    // config options
    root: './src/pages/',
    server: {
        https: 'true'
    },
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'src/pages/index/index.html'),
                test: resolve(__dirname, 'src/pages/test/index.html')
            },
            output: {
                dir: "dist",
            }
        }
    }
})
