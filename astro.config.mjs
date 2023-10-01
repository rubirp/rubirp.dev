import { defineConfig } from 'astro/config';
import astroI18next from 'astro-i18next';
import tailwind from '@astrojs/tailwind';

//  base: '/rubirp.dev',

// https://astro.build/config
export default defineConfig({
  site: 'https://rubirp.dev',
  integrations: [tailwind(), astroI18next()]
});