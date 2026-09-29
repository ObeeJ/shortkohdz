import { getCloudflareContext } from "@opennextjs/cloudflare";

export type GuestbookEntry = {
  id: number;
  name: string;
  message: string;
  signature_png: string;
  created_at: string;
};

export async function getDb() {
  const { env } = await getCloudflareContext({ async: true });
  return (env as Record<string, any>)?.DB;
}
