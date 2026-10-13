import { chromium } from '@playwright/test';

const BASE = 'http://localhost:4321';

const BENIGN = [
  /youtube/i,
  /favicon/i,
  /unsplash\.com/i,
  /devtools/i,
  /fetchpriority/i,
  /deprecation/i,
];

let failures = [];
let warnings = [];

function check(page, name, fn) {
  return async () => {
    try {
      await fn();
      console.log(`  ok    ${name}`);
    } catch (err) {
      failures.push({ page, name, err: err.message });
      console.log(`  FAIL  ${name} :: ${err.message}`);
    }
  };
}

function watchPage(page) {
  page.on('pageerror', (err) => {
    failures.push({ page: 'browser', name: 'pageerror', err: err.message });
    console.log(`  FAIL  pageerror :: ${err.message}`);
  });
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const text = msg.text();
    const benign = BENIGN.some((re) => re.test(text));
    const critical = /react|hydrat|astro-island|mismatch|warning:|error parsing/i.test(text);
    if (critical && !benign) {
      failures.push({ page: 'console', name: 'console.error', err: text });
      console.log(`  FAIL  console.error :: ${text}`);
    } else if (!benign) {
      warnings.push(text);
    }
  });
}

async function waitHydrated(page) {
  await page
    .locator('astro-island[ssr]')
    .first()
    .waitFor({ state: 'detached', timeout: 30000 });
}

async function openSidebar(page) {
  if ((await page.locator('.sidebar--open').count()) > 0) return;
  const toggle = page.getByRole('button', { name: 'Toggle menu' });
  await toggle.click();
  await page.locator('.sidebar--open').waitFor({ timeout: 10000 });
}

let browser;

async function freshPage(route) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  watchPage(page);
  await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await waitHydrated(page);
  return { context, page };
}

async function suiteHome() {
  const { context, page } = await freshPage('/');
  const t = (name, fn) => check('/', name, fn)();

  await t('hero visible', async () => {
    await page.getByText('Creative Studio', { exact: true }).waitFor({ timeout: 15000 });
  });

  await t('footer present', async () => {
    if ((await page.locator('footer').count()) < 1) throw new Error('footer not found');
  });

  await t('4 service cards', async () => {
    const n = await page.locator('button.service-card').count();
    if (n !== 4) throw new Error(`expected 4 service buttons, got ${n}`);
  });

  await t('service modal opens and closes', async () => {
    await page.locator('button.service-card').first().click();
    const overlay = page.locator('.service-modal-overlay');
    await overlay.waitFor({ state: 'visible', timeout: 10000 });
    await overlay.getByRole('button', { name: 'Close' }).click();
    await overlay.waitFor({ state: 'detached', timeout: 10000 });
  });

  await t('scroll-to-top appears and works', async () => {
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    const btn = page.getByRole('button', { name: 'Scroll to top' });
    await btn.waitFor({ timeout: 10000 });
    await btn.click();
    await page.waitForFunction(() => window.scrollY < 80, { timeout: 15000 });
  });

  await t('sidebar opens and navigates to Gallery', async () => {
    await openSidebar(page);
    if ((await page.locator('.hamburger.is-active').count()) < 1)
      throw new Error('hamburger did not morph to X');
    const links = await page.locator('aside nav a').count();
    if (links !== 6) throw new Error(`expected 6 nav links, got ${links}`);
    await page.locator('aside nav a', { hasText: 'Gallery' }).first().click();
    await page.waitForURL('**/gallery', { timeout: 15000 });
  });

  await context.close();
}

async function suiteGallery() {
  const { context, page } = await freshPage('/gallery');
  const t = (name, fn) => check('/gallery', name, fn)();

  await t('theme toggle flips dark class and persists', async () => {
    await openSidebar(page);
    const themeSwitch = page.getByRole('switch', { name: 'Toggle theme' });
    const classBefore = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    );
    await themeSwitch.click();
    const classAfter = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    );
    if (classAfter === classBefore) throw new Error('dark class did not flip');
    let stored = await page.evaluate(() => localStorage.getItem('theme'));
    if (stored !== (classAfter ? 'dark' : 'light'))
      throw new Error(`localStorage.theme=${stored}`);
    await themeSwitch.click();
    const classRestored = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    );
    if (classRestored !== classBefore) throw new Error('dark class not restored');
    stored = await page.evaluate(() => localStorage.getItem('theme'));
    if (stored !== (classBefore ? 'dark' : 'light'))
      throw new Error(`localStorage.theme=${stored}`);
  });

  await t('language toggle switches EN<->ES without reload', async () => {
    await openSidebar(page);
    await page.evaluate(() => {
      window.__marker = true;
    });
    const langToggle = page.getByRole('button', { name: 'Toggle language' });
    try {
      await langToggle.click();
      await page
        .locator('aside nav a', { hasText: 'Galería' })
        .first()
        .waitFor({ timeout: 10000 });
      const marker = await page.evaluate(() => window.__marker === true);
      if (!marker) throw new Error('page reloaded on language toggle');
      const stored = await page.evaluate(() => localStorage.getItem('language'));
      if (stored !== 'es') throw new Error(`localStorage.language=${stored}`);
      const btnLabel = await page
        .locator('aside .sidebar__lang-label')
        .textContent();
      if (!btnLabel.includes('Español')) throw new Error('toggle label did not flip');
    } finally {
      await page.evaluate(() => localStorage.setItem('language', 'en'));
    }
    await langToggle.click();
    await page
      .locator('aside nav a', { hasText: 'Gallery' })
      .first()
      .waitFor({ timeout: 10000 });
    const stored = await page.evaluate(() => localStorage.getItem('language'));
    if (stored !== 'en') throw new Error(`localStorage.language=${stored}`);
  });

  await t('gallery lightbox opens and closes', async () => {
    if ((await page.locator('.sidebar--open').count()) > 0) {
      await page.getByRole('button', { name: 'Close menu' }).click();
      await page.locator('.sidebar--open').waitFor({ state: 'detached', timeout: 10000 });
    }
    await page.locator('.sphere__item').nth(3).dispatchEvent('click');
    const overlay = page.locator('.lightbox-overlay');
    await overlay.waitFor({ state: 'visible', timeout: 10000 });
    await page.mouse.click(10, 10);
    await overlay.waitFor({ state: 'detached', timeout: 10000 });
  });

  await t('theme persists across navigation', async () => {
    await page.evaluate(() => localStorage.setItem('theme', 'light'));
    await page.reload({ waitUntil: 'domcontentloaded' });
    await waitHydrated(page);
    let dark = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    );
    if (dark) throw new Error('dark applied despite saved light');
    let stored = await page.evaluate(() => localStorage.getItem('theme'));
    if (stored !== 'light') throw new Error(`theme overwritten to ${stored} on load`);

    await page.goto(`${BASE}/about`, { waitUntil: 'domcontentloaded' });
    await waitHydrated(page);
    dark = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    );
    if (dark) throw new Error('dark applied after navigation');
    stored = await page.evaluate(() => localStorage.getItem('theme'));
    if (stored !== 'light') throw new Error(`theme overwritten to ${stored} after nav`);
  });

  await context.close();
}

async function run() {
  browser = await chromium.launch();

  await suiteHome();
  await suiteGallery();

  const routes = {};

  routes['/about'] = async (page, t) => {
    await t('about lightbox opens and closes', async () => {
      await page.locator('.studio-card').first().click();
      const overlay = page.locator('.lightbox-overlay');
      await overlay.waitFor({ state: 'visible', timeout: 10000 });
      await page.mouse.click(10, 10);
      await overlay.waitFor({ state: 'detached', timeout: 10000 });
    });

    await t('legal modal lazy-loads and closes', async () => {
      await page.locator('footer .site-footer__legal-link').first().click();
      const dialog = page.locator('.legal-modal-dialog');
      await dialog.waitFor({ state: 'visible', timeout: 10000 });
      await page.keyboard.press('Escape');
      await dialog.waitFor({ state: 'detached', timeout: 10000 });
    });
  };

  routes['/reels'] = async (page, t) => {
    await t('carousel changes video and dots', async () => {
      const frame = page.locator('.reels-frame iframe');
      if ((await frame.count()) !== 1) throw new Error('expected a single iframe');
      const before = await frame.getAttribute('src');
      await page.getByRole('button', { name: 'Next' }).click();
      await page.waitForFunction(
        (prev) => {
          const src = document.querySelector('.reels-frame iframe')?.getAttribute('src');
          return src && src !== prev;
        },
        before,
        { timeout: 10000 }
      );
      await page.getByRole('button', { name: 'Previous' }).click();
    });
  };

  routes['/talents'] = async (page, t) => {
    await t('card flips on click and resets', async () => {
      const card = page.locator('.talent-card').first();
      const inner = card.locator('.talent-card__inner');
      await card.click();
      await page.waitForFunction(
        (el) => el.classList.contains('talent-card__inner--flipped'),
        await inner.elementHandle(),
        { timeout: 10000 }
      );
      await card.click();
      await page.waitForFunction(
        (el) => !el.classList.contains('talent-card__inner--flipped'),
        await inner.elementHandle(),
        { timeout: 10000 }
      );
    });
  };

  routes['/work'] = async (page, t) => {
    await t('renders with images, footer and h1', async () => {
      const h1 = (await page.locator('h1.page-title').textContent()) || '';
      if (!h1.trim()) throw new Error('empty h1');
      if ((await page.locator('img').count()) < 1) throw new Error('no images');
      if ((await page.locator('footer').count()) < 1) throw new Error('no footer');
    });
  };

  for (const [route, suite] of Object.entries(routes)) {
    const { context, page } = await freshPage(route);
    const t = (name, fn) => check(route, name, fn)();
    await suite(page, t);
    await context.close();
  }

  await browser.close();

  console.log('\n================ SUMMARY ================');
  if (failures.length) {
    console.log(`${failures.length} failure(s):`);
    for (const f of failures) console.log(` - [${f.page}] ${f.name}: ${f.err}`);
  } else {
    console.log('ALL CHECKS PASSED');
  }
  if (warnings.length) {
    console.log(`\n${warnings.length} non-critical console error(s):`);
    for (const w of warnings) console.log(` - ${w}`);
  }
  process.exit(failures.length ? 1 : 0);
}

run();