import {defineConfig} from 'vite';

export default defineConfig(({command}) => ({
  // GitHub project sites live under the repository name; local development stays at /.
  base: command = '/',
}));
