import { defineConfig } from '@fullstacksjs/eslint-config';

/**
 * @link https://github.com/fullstacksjs/eslint-config
 */
export default defineConfig({
  jest: true,
  typescript: {
    tsconfigRootDir: import.meta.dirname,
  },
  import: true,
  test: true,
});
