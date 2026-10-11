import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  const headers = new Headers(response.headers);
  headers.set('X-Robots-Tag', 'index, follow');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
