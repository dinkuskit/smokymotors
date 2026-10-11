import { getDb } from 'emdash/runtime';

export interface Vehicle {
  id: string;
  slug: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  price: number;
  mileage: number;
  vin: string;
  photos?: string;
  description: string;
  availability: 'available' | 'sold';
}

/** Read the public vehicle projection directly from the CMS collection table. */
export async function getPublicVehicles(): Promise<Vehicle[]> {
  const db = (await getDb()) as any;
  const rows = await db.selectFrom('ec_vehicles').selectAll().where('status', '=', 'published').execute();
  return rows.map(publicVehicle);
}

export async function getPublicVehicle(slug: string): Promise<Vehicle | undefined> {
  const vehicles = await getPublicVehicles();
  return vehicles.find((vehicle) => vehicle.slug === slug);
}

export async function getHomePage(): Promise<{ title: string; headline: string; address: string }> {
  const db = (await getDb()) as any;
  const row = await db.selectFrom('ec_pages').selectAll().where('id', '=', 'home').executeTakeFirst();
  return {
    title: row?.title ?? 'Smoky Motors',
    headline: row?.headline ?? 'Find your next ride.',
    address: row?.address ?? '7264 HWY 411, Benton, TN 37307',
  };
}

function publicVehicle(row: Record<string, unknown>): Vehicle {
  return {
    id: String(row.id),
    slug: String(row.slug),
    year: Number(row.year),
    make: String(row.make),
    model: String(row.model),
    trim: row.trim ? String(row.trim) : undefined,
    price: Number(row.price),
    mileage: Number(row.mileage),
    vin: String(row.vin),
    photos: row.photos ? String(row.photos) : undefined,
    description: String(row.description),
    availability: row.availability === 'sold' ? 'sold' : 'available',
  };
}
