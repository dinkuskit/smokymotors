import cloudflare from '@astrojs/cloudflare';
import node from '@astrojs/node';
import react from '@astrojs/react';
import { d1, r2 } from '@emdash-cms/cloudflare';
import { formsPlugin } from '@emdash-cms/plugin-forms';
import emdash, { local } from 'emdash/astro';
import { sqlite } from 'emdash/db';
import { defineConfig } from 'astro/config';

const isCloudflare = process.env.ASTRO_ADAPTER === 'cloudflare';

export default defineConfig({
  output: 'server',
  site: 'https://smokymotors.com',
  trailingSlash: 'never',
  adapter: isCloudflare ? cloudflare() : node({ mode: 'standalone' }),
  integrations: [
    react(),
    emdash({
      plugins: [formsPlugin()],
      database: isCloudflare
        ? d1({ binding: 'DB' })
        : sqlite({ url: 'file:./.emdash/content.db' }),
      storage: isCloudflare
        ? r2({ binding: 'MEDIA' })
        : local({
            directory: './.emdash/uploads',
            baseUrl: '/_emdash/api/media/file',
          }),
    }),
  ],
  vite: {
    ssr: {
      // Keep EmDash's Kysely dependency in the Worker bundle. Leaving the
      // database modules split lets Vite emit a circular chunk graph that
      // evaluates the Kysely base class before it has been initialized.
      noExternal: true,
    },
    build: {
      rollupOptions: {
        output: {
          // Keep the EmDash/Kysely runtime in one shared chunk. Splitting
          // these modules caused a circular import during Worker startup.
          manualChunks: () => 'worker-runtime',
        },
      },
    },
  },
});
