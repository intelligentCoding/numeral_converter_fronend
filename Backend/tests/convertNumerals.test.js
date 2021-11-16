const puppeteer = require('puppeteer');
let page;
let pages;

beforeEach(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    page = await browser.newPage();
    pages = await browser.pages();
    await page.goto('http://localhost:3000/');
});

afterEach(async () => {
  await page.close();
  if (pages.length > 1) {
    await pages[0].close();
}
});

describe('Test Convert To Toman', () => {
    test('test adding a string', async () => {
        await page.focus('#ArabicValue')
        await page.keyboard.type('asdf')
        await page.waitForSelector('#arabicError')
        let element = await page.$('#arabicError')
        let value = await page.evaluate(el => el.textContent, element)
        expect(value).toEqual('Arabic Numeral Must be between 0 - 3999');
    })

    test('test adding biggern umber', async () => {
        await page.focus('#ArabicValue')
        await page.keyboard.type('49999')
        await page.waitForSelector('#arabicError')
        let element = await page.$('#arabicError')
        let value = await page.evaluate(el => el.textContent, element)
        expect(value).toEqual('Arabic Numeral Must be between 0 - 3999');
    })
})

describe('Test Convert To Arabic', () => {
    test('adding wrong roman', async () => {
        await page.focus('#romanValue')
        await page.keyboard.type('asdf')
        await page.waitForSelector('#romanError')
        let element = await page.$('#romanError')
        let value = await page.evaluate(el => el.textContent, element)
        expect(value).toEqual('Invalid Roman Numeral');
    })

    test('test adding integer', async () => {
        await page.focus('#romanValue')
        await page.keyboard.type('49999')
        await page.waitForSelector('#romanError')
        let element = await page.$('#romanError')
        let value = await page.evaluate(el => el.textContent, element)
        expect(value).toEqual('Invalid Roman Numeral');
    })
})