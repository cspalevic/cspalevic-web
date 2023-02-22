import { writeFileSync } from "fs";
import puppeteer from "puppeteer";

const WEBSITE_URL = "https://cspalevic.com/resume";
const OUTPUT_FILE_NAME = "Charlie Spalevic Resume.pdf";

const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(WEBSITE_URL);

  await page.evaluate(() => {
    const header = document.querySelector("header");
    header?.parentElement?.removeChild(header);
  });

  const pdf = await page.pdf({
    printBackground: true,
  });

  writeFileSync(OUTPUT_FILE_NAME, pdf);

  await browser.close();
};

run();
