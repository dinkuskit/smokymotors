import type { APIRoute } from 'astro';

/**
 * Exact public submit path for Access policying. The upstream EmDash forms
 * plugin remains responsible for validation, persistence, and notifications.
 */
export const POST: APIRoute = async ({ request, url }) => {
  const target = new URL('/_emdash/api/plugins/emdash-forms/submit', url);
  return fetch(new Request(target, request));
};
