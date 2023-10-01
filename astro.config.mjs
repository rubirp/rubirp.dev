import { defineConfig } from 'astro/config';
import astroI18next from 'astro-i18next';
import tailwind from '@astrojs/tailwind';


// https://astro.build/config
export default defineConfig({
  site: 'https://rubirp.dev',
  base: '/rubirp.dev',
  integrations: [tailwind(), astroI18next()]
});