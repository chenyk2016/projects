const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
    // config options
    // root: './h5',
    server: {
        https: 'true'
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                test: resolve(__dirname, 'test/index.html')
            }
        }
    }
})
