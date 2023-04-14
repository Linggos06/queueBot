import * as dotenv from 'dotenv';
dotenv.config();
import puppeteer from 'puppeteer';
import { createWorker } from 'tesseract.js';

(async () => {
  const browser = await puppeteer.launch({headless: false});

  const page = await browser.newPage();

  await page.goto('https://ankara.kdmid.ru/queue/visitor.aspx');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Type into input boxes
  await page.type('#ctl00_MainContent_txtFam', process.env.SURNAME);
  await page.type('#ctl00_MainContent_txtIm', process.env.NAME);
  await page.type('#ctl00_MainContent_txtOt', process.env.SECOND_NAME);
  await page.type('#ctl00_MainContent_txtTel', process.env.PHONE_NUMBER);
  await page.type('#ctl00_MainContent_txtEmail', process.env.EMAIL);

  await page.evaluate(() => {
    let day = document.querySelector('#ctl00_MainContent_DDL_Day');
    let month = document.querySelector('#ctl00_MainContent_DDL_Month');
    let title = document.querySelector('#ctl00_MainContent_DDL_Mr');
    day.value = "21";
    month.value = "11";
    title.value = "MS";
  });

  await page.type('#ctl00_MainContent_TextBox_Year', process.env.YEAR);

  const image = await page.waitForSelector('div > img#ctl00_MainContent_imgSecNum');
  const imageSrc = await image.evaluate(el => el.src);
  
  console.log(imageSrc);
 
  (async () => {
    const worker = await createWorker();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    await worker.setParameters({
      tessedit_char_whitelist: '0123456789',
    });
    const { data: { text } } = await worker.recognize(imageSrc);
    console.log(text); 
    await worker.terminate(); 

  })();

  // await page.type('#ctl00_MainContent_txtCode', '5555');

  // await browser.close();
})();