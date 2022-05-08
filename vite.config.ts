import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';
import fs from 'fs';
import path from 'path/posix';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin({ cache: false }), svgLoader()],
  base: './',
  server: {
    https: {
      key: fs.readFileSync('./.cert/localhost-key.pem'),
      cert: fs.readFileSync('./.cert/localhost.pem'),
    },
    port: 3001,
  },
  resolve: {
    alias: [
      {
        find: '@svg',
        replacement: path.resolve(path.dirname(''), 'src/assets/svg'),
      },
      {
        find: '@base',
        replacement: path.resolve(path.dirname(''), 'src/components/Base'),
      },
      {
        find: '@plugins',
        replacement: path.resolve(path.dirname(''), 'src/plugins'),
      },
      {
        find: '@interfaces',
        replacement: path.resolve(path.dirname(''), 'src/interfaces'),
      },
    ],
  },
});
