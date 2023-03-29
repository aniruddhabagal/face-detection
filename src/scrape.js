// import React from "react";
const puppeteer = require("puppeteer");

const url = "https://www.google.com";

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = (await browser.pages())[0];
  await page.goto(url);
  const extractedText = await page.$eval("*", (el) => el.innerText);
  console.log(extractedText);

  await browser.close();
})();

// export default url;
