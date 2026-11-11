import { defineConfig } from 'astro/config';
import astroI18next from 'astro-i18next';


// https://astro.build/config
export default defineConfig({
  site: 'https://rubirp.dev',
  //base: '/rubirp.dev',
  integrations: [astroI18next()]
});
