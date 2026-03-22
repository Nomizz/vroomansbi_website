import puppeteer from 'puppeteer';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';
const dir   = './screenshots';

if (!existsSync(dir)) mkdirSync(dir);

// Auto-increment screenshot number
const existing = existsSync(dir)
  ? readdirSync(dir).filter(f => f.endsWith('.png')).length
  : 0;
const n = existing + 1;
const filename = label
  ? `screenshot-${n}-${label}.png`
  : `screenshot-${n}.png`;
const outputPath = join(dir, filename);

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });

// Wait a bit for fonts to render
await new Promise(r => setTimeout(r, 800));

await page.screenshot({ path: outputPath, fullPage: true });
await browser.close();

console.log(`Screenshot saved: ${outputPath}`);
