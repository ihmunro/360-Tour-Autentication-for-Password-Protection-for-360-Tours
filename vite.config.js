import { defineConfig } from 'vite'

export default defineConfig({
  base: 'https://optimus360.s3.us-west-2.amazonaws.com/dist/',
  build: {
    assetsDir: 'assets'
  }
})
