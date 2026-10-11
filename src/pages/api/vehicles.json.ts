import type { APIRoute } from 'astro';
import { getPublicVehicles } from '../../data';

export const GET: APIRoute = async () => {
  const publicEntries = await getPublicVehicles();
  return new Response(JSON.stringify(publicEntries), {
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=60' },
  });
};
