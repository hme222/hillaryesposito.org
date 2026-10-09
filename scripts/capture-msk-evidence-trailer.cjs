const fs = require('fs');
const path = require('path');
const { chromium } = require('/Users/hills_mac/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const outputDir = path.resolve(__dirname, '../design-docs/generation-inputs/msk-evidence-trailer');
fs.mkdirSync(outputDir, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2, colorScheme: 'light', reducedMotion: 'no-preference' });
  await page.goto('http://localhost:3000/case-study/msk', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.locator('.rp-hero__media .fp-dashboardFrame').first().waitFor({ state: 'visible', timeout: 15000 });

  async function captureMacro(name, selectors, variant = 'strip') {
    await page.evaluate(({ selectors, variant }) => {
      document.getElementById('msk-capture-stage')?.remove();
      const stage = document.createElement('div');
      stage.id = 'msk-capture-stage';
      stage.className = 'riso-page';
      stage.setAttribute('aria-hidden', 'true');
      stage.style.cssText = `position:fixed;inset:0 auto auto 0;z-index:2147483647;width:1440px;height:810px;box-sizing:border-box;overflow:hidden;display:flex;flex-direction:${variant === 'strip' ? 'row' : 'column'};align-items:${variant === 'strip' ? 'center' : 'stretch'};justify-content:${variant === 'strip' ? 'space-between' : 'center'};gap:${variant === 'strip' ? '58px' : '48px'};padding:${variant === 'strip' ? '120px 150px' : '118px 130px'};background:radial-gradient(circle at 78% 16%,rgba(219,232,224,.88),transparent 34%),linear-gradient(112deg,#f4f1e6 0%,#f8f6ef 58%,#e7eee8 100%);`;
      for (const selector of selectors) {
        const source = document.querySelector(selector);
        if (!source) throw new Error(`Missing macro source: ${selector}`);
        const clone = source.cloneNode(true);
        clone.removeAttribute('id');
        clone.querySelectorAll?.('[id]').forEach(node => node.removeAttribute('id'));
        clone.style.width = variant === 'strip' ? 'auto' : '100%';
        clone.style.boxSizing = 'border-box';
        clone.style.margin = '0';
        if (variant === 'strip') {
          clone.style.fontSize = '44px';
          clone.style.lineHeight = '1.15';
          clone.querySelectorAll?.('*').forEach(node => { node.style.fontSize = 'inherit'; node.style.lineHeight = 'inherit'; });
          clone.querySelectorAll?.('.msk-dashboard-status, .msk-dashboard-action').forEach(node => { node.style.padding = '.48em .78em'; node.style.borderRadius = '999px'; });
        } else {
          clone.style.fontSize = '27px';
          clone.querySelectorAll?.('*').forEach(node => { if (!node.classList.contains('msk-dashboard-mockup__eyebrow')) node.style.fontSize = 'inherit'; });
        }
        stage.appendChild(clone);
      }
      document.body.appendChild(stage);
    }, { selectors, variant });
    await page.screenshot({ path: path.join(outputDir, name), clip: { x: 0, y: 0, width: 1440, height: 810 } });
  }

  const hero = '.rp-hero__media .msk-dashboard-mockup';
  const cell = (status, n) => `${hero} .msk-dashboard-mockup__row[data-status='${status}'] > [role='cell']:nth-child(${n})`;
  await captureMacro('10-ready-action-macro.png', [cell('ready-to-file', 2), cell('ready-to-file', 3), cell('ready-to-file', 5)]);
  await captureMacro('11-permission-macro.png', [`${hero} .msk-dashboard-mockup__topbar`, `${hero} .msk-dashboard-mockup__rule`], 'stack');
  await captureMacro('12-owned-exception-macro.png', [2, 3, 4, 5].map(n => cell('needs-review', n)));
  await captureMacro('13-resolved-state-macro.png', [2, 3, 4, 5].map(n => cell('filed-to-chart', n)));
  await browser.close();
  process.stdout.write(`${outputDir}\n`);
})().catch(error => { console.error(error); process.exitCode = 1; });
