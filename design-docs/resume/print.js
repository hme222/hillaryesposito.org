// Prints portfolio-resume.html to the site's résumé PDF with local Chrome.
// Run from the repo root: node design-docs/resume/print.js
const path = require("path");
const { chromium } = require(path.resolve("node_modules/playwright-core"));
(async () => {
  const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
  const page = await browser.newPage();
  await page.goto("file://" + path.resolve("design-docs/resume/portfolio-resume.html"));
  await page.pdf({ path: "my-app/public/assets/Hillary_Esposito_Portfolio_Resume.pdf", format: "Letter", preferCSSPageSize: true, printBackground: true });
  await browser.close();
})();
