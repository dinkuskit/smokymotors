import cloudflare from '@astrojs/cloudflare';
import node from '@astrojs/node';
import react from '@astrojs/react';
import { d1, r2 } from '@emdash-cms/cloudflare';
import emdash, { local } from 'emdash/astro';
import { sqlite } from 'emdash/db';
import { defineConfig } from 'astro/config';

const isCloudflare = process.env.ASTRO_ADAPTER === 'cloudflare';

export default defineConfig({
  output: 'server',
  site: 'https://smokymotors.com',
  adapter: isCloudflare ? cloudflare() : node({ mode: 'standalone' }),
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (
              id.includes('/node_modules/kysely/') ||
              id.includes('/node_modules/kysely-d1/') ||
              id.includes('/node_modules/@libsql/kysely-libsql/')
            ) {
              return 'kysely';
            }
          },
        },
      },
    },
  },
  integrations: [
    react(),
    emdash({
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
});
