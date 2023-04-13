import * as dotenv from 'dotenv';
dotenv.config();
import puppeteer from 'puppeteer';


(async () => {
  const browser = await puppeteer.launch({headless: false});

  const page = await browser.newPage();

  await page.goto('https://ankara.kdmid.ru/queue/visitor.aspx');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Type into search box
  await page.type('#ctl00_MainContent_txtFam', process.env.SURNAME);
  await page.type('#ctl00_MainContent_txtIm', process.env.NAME);
  await page.type('#ctl00_MainContent_txtOt', process.env.SECOND_NAME);
  await page.type('#ctl00_MainContent_txtTel', process.env.PHONE_NUMBER);
  await page.type('#ctl00_MainContent_txtEmail', process.env.EMAIL);

  await page.evaluate(() => {
    let day = document.querySelector('#ctl00_MainContent_DDL_Day');
    day.value = "21";
  });

  await page.evaluate(() => {
    let month = document.querySelector('#ctl00_MainContent_DDL_Month');
    month.value = "11";
  });

  await page.type('#ctl00_MainContent_TextBox_Year', process.env.YEAR);

  await page.evaluate(() => {
    let title = document.querySelector('#ctl00_MainContent_DDL_Mr');
    title.value = "MS";
  });

  // await page.type('#ctl00_MainContent_txtCode', '5555');

  // // Wait and click on first result
  // const searchResultSelector = '.search-box__link';
  // await page.waitForSelector(searchResultSelector);
  // await page.click(searchResultSelector);

  // // Locate the full title with a unique string
  // const textSelector = await page.waitForSelector(
  //   'text/Customize and automate'
  // );
  // const fullTitle = await textSelector.evaluate(el => el.textContent);

  // // Print the full title
  // console.log('The title of this blog post is "%s".', fullTitle);

  // await browser.close();
})();