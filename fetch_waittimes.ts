import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';

async function fetchWaitTimes() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.tokyodisneyresort.jp/_/realtime/tds_attraction.json');
  // ページの描画結果からjsonのデータを取得
  const data = await page.evaluate(() => {
    return JSON.parse(document.querySelector('pre')?.textContent || '{}');
  });
  await writeFile('./public/waittimes.json', JSON.stringify(data, null, 2), 'utf-8');
  await browser.close();
  console.log('waittimes.json updated');
}

fetchWaitTimes();
