import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const routes = [
  { name: 'landing', path: '/' },
  { name: 'login', path: '/login' },
  { name: 'register', path: '/register' },
  { name: 'forgot-password', path: '/forgot-password' },
];

const viewports = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'desktop-1280', width: 1280, height: 800 },
  { name: 'desktop-1024', width: 1024, height: 768 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-360', width: 360, height: 800 },
];

const outputDir = path.resolve('e:/jobai-2/scratch/screenshots');

async function runVisualQA() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();

  console.log('Starting Visual QA Screenshot Capture...');

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    for (const route of routes) {
      const url = `http://localhost:4321${route.path}`;
      await page.goto(url, { waitUntil: 'networkidle' });

      const fileName = `${route.name}-${vp.name}.png`;
      const filePath = path.join(outputDir, fileName);

      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`Captured: ${fileName}`);
    }

    await context.close();
  }

  await browser.close();
  console.log('Visual QA Screenshot Capture Complete!');
}

runVisualQA().catch((err) => {
  console.error('Visual QA Error:', err);
  process.exit(1);
});
