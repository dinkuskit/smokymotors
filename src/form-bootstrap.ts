import { definePlugin, type PluginContext, type PluginDescriptor } from 'emdash';
import { getDb } from 'emdash/runtime';
import { ulid } from 'ulidx';
import { siteConfig } from './config';

const FORM_ID = 'ask-about-car';

export function askAboutCarBootstrap(): PluginDescriptor {
  return {
    id: 'smoky-motors-form-bootstrap',
    version: '1.0.0',
    entrypoint: new URL('./form-bootstrap.ts', import.meta.url).pathname,
  };
}

export function createPlugin() {
  return definePlugin({
    id: 'smoky-motors-form-bootstrap',
    version: '1.0.0',
    hooks: {
      'plugin:activate': {
        handler: async (_event: unknown, ctx: PluginContext) => {
          const db = (await getDb()) as any;
          const existing = await db
            .selectFrom('_plugin_storage')
            .select('id')
            .where('plugin_id', '=', 'emdash-forms')
            .where('collection', '=', 'forms')
            .where('id', '=', FORM_ID)
            .executeTakeFirst();
          if (existing) return;

          const now = new Date().toISOString();
          const form = {
            name: 'Ask about this car',
            slug: FORM_ID,
            pages: [{
              fields: [
                { id: ulid(), type: 'text', label: 'Name', name: 'name', required: true, width: 'full' },
                { id: ulid(), type: 'email', label: 'Email', name: 'email', required: true, width: 'full' },
                { id: ulid(), type: 'tel', label: 'Phone', name: 'phone', required: false, width: 'full' },
                { id: ulid(), type: 'textarea', label: 'Message', name: 'message', required: true, width: 'full' },
              ],
            }],
            settings: {
              confirmationMessage: 'Thanks — Smoky Motors will be in touch.',
              notifyEmails: [siteConfig.contactEmail],
              digestEnabled: false,
              digestHour: 9,
              retentionDays: 0,
              spamProtection: 'honeypot',
              submitLabel: 'Send inquiry',
            },
            status: 'active',
            submissionCount: 0,
            lastSubmissionAt: null,
            createdAt: now,
            updatedAt: now,
          };

          await db.insertInto('_plugin_storage').values({
            plugin_id: 'emdash-forms',
            collection: 'forms',
            id: FORM_ID,
            data: JSON.stringify(form),
            created_at: now,
            updated_at: now,
            revision: crypto.randomUUID(),
          }).execute();
          ctx.log.info('Bootstrapped ask-about-car form');
        },
      },
    },
  });
}

export default createPlugin;
