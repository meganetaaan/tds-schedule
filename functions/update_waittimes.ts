// Cloudflare Scheduled Function: 15分ごとにwaittimes.jsonを更新
import { writeFile } from 'node:fs/promises';

export const onSchedule = async (event, env, ctx) => {
  const url = 'https://www.tokyodisneyresort.jp/_/realtime/tds_attraction.json';
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch waittimes');
  const data = await res.json();

  // Cloudflare Pagesのpublicディレクトリにwaittimes.jsonを書き込む
  // __STATIC_CONTENTは読み取り専用なので、KVやR2を使う必要あり
  // ここではKVを使う例
  await env.WAITTIMES_KV.put('waittimes.json', JSON.stringify(data, null, 2));
};

// wrangler.tomlで以下のようにスケジュールとKVバインディングを設定してください
// [[kv_namespaces]]
// binding = "WAITTIMES_KV"
// id = "<your-kv-namespace-id>"
// [[triggers]]
// cron = "*/15 * * * *"
