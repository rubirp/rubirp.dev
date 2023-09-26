import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";


// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  site: 'https://rubirp.github.io',
  base: '/rubirp.dev',
  integrations: [tailwind()]
});