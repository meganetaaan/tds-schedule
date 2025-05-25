import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { readFile } from 'node:fs/promises';

const app = new Hono()

app.get('/api/waittimes', async (c) => {
  try {
    const json = await readFile('./public/waittimes.json', 'utf-8');
    return c.text(json, 200, { 'Content-Type': 'application/json' });
  } catch (e) {
    return c.json({ error: 'No cached wait times' }, 500);
  }
})
// public配下を静的ファイルとして提供
app.use('/*', serveStatic({ root: './public' }))

export default app
