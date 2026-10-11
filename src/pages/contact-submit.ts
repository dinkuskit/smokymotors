import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  const handler = locals.emdash?.handlePublicPluginApiRoute;
  if (!handler) return new Response('EmDash forms are not configured', { status: 503 });

  let pluginRequest = request;
  if (request.headers.get('content-type')?.includes('application/x-www-form-urlencoded')) {
    const form = await request.formData();
    const formId = String(form.get('formId') ?? '');
    const data = Object.fromEntries(
      [...form.entries()]
        .filter(([key]) => key !== 'formId')
        .map(([key, value]) => [key, typeof value === 'string' ? value : value.name]),
    );
    pluginRequest = new Request(request.url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ formId, data }),
    });
  }

  // Dispatch in-process so this exact Access-bypass route never makes an HTTP
  // request to the Access-gated wildcard route.
  const result = await handler('emdash-forms', 'POST', '/submit', pluginRequest);
  return new Response(JSON.stringify(result), {
    status: result.success ? 200 : 400,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
