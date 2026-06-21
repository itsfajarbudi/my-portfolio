const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    await page.goto('file:///d:/MYPORTO/admin/index.html');
    await page.type('#username', 'fajar@portofolio.com');
    await page.type('#password', 'admin123');
    await page.click('button[type="submit"]');
    await new Promise(r => setTimeout(r, 2000));
    console.log('Final URL:', page.url());
    await browser.close();
})();
