import { ComponentItem } from "./types";

const base =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
const REGISTRY_BASE = `${base}/registry`;

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`Registry fetch failed (${res.status}): ${url}`);
  }
  return (await res.json()) as T;
}

export async function fetchComponents(): Promise<ComponentItem[]> {
  const data = await fetchJson<{ components: ComponentItem[] }>(
    `${REGISTRY_BASE}/index.json`,
  );
  return data.components;
}

export async function fetchComponentBySlug(
  slug: string,
): Promise<ComponentItem | undefined> {
  return fetchJson<ComponentItem>(`${REGISTRY_BASE}/components/${slug}.json`);
}
