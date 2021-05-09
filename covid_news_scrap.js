const puppeteer = require("puppeteer");
function main(req, res) {
  (async () => {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
    });
    const page = await browser.newPage();

    //Google News
    await page.goto("https://news.google.com/news/");
    const data1 = await page.evaluate(async () => {
      await new Promise((resolve) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 60);
      });
      const headlineNodes = document.querySelectorAll("h3>a");
      return {
        headlines1: Array.from(headlineNodes).map((a) => a.textContent),
      };
    });
    await page.screenshot({ path: "output1.png" });
    console.log(data1);

    //BBC News
    await page.goto("https://www.bbc.com/news/world");
    const data2 = await page.evaluate(async () => {
      await new Promise((resolve) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 60);
      });
      const headlineNodes = document.querySelectorAll("h3>a");
      return {
        headlines2: Array.from(headlineNodes).map((a) => a.textContent),
      };
    });
    await page.screenshot({ path: "output2.png" });
    console.log(data2);

    //Covid cases as per country
    await page.goto(
      "https://www.worldometers.info/coronavirus/?utm_campaign=homeAdvegas1?%22%20%5Cl%22countries",
      { waitUntil: "load", timeout: 0 }
    );
    const data3 = await page.evaluate(async () => {
      await new Promise((resolve) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 50);
      });
      const headlineNodes = document.querySelectorAll(
        "div.news_post>div>ul>li"
      );
      return {
        covidCases: Array.from(headlineNodes).map((a) => a.textContent),
      };
    });
    await page.screenshot({ path: "output3.png" });
    console.log(data3);

    //Hospitals near me
    await page.goto("https://google.com");
    await page.click("[name=q]");
    await page.keyboard.type("Hospitals near me");
    await page.keyboard.press("Enter");
    await page.waitForNavigation(2000);
    const data4 = await page.evaluate(async () => {
      const headlineNodes = document.querySelectorAll("div.cXedhc>div>span");
      return {
        hospitalNearMe: Array.from(headlineNodes).map((a) => a.textContent),
      };
    });
    await page.screenshot({ path: "output4.png" });
    console.log(data4);


// covid vaccination percentage as per country and pupulation of all country
    await page.goto(
      "https://ourworldindata.org/covid-vaccinations",
      { waitUntil: "load", timeout: 0 }
    );
    const data5 = await page.evaluate(async () => {
      await new Promise((resolve) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 85);
      });
      const headlineNodes = document.querySelectorAll(
        "g.bar"
      );
      return {
        covidCases: Array.from(headlineNodes).map((a) => a.textContent),
      };
    });
    await page.screenshot({ path: "output5.png" });
    console.log(data5);

    // Vaccination against COVID-19 has now started in 191 locations and which Vaccine adapted by country by country and date
    await page.goto(
        "https://ourworldindata.org/covid-vaccinations",
        { waitUntil: "load", timeout: 0 }
      );
      const data6 = await page.evaluate(async () => {
        const headlineNodes = document.querySelectorAll(
          "div.wp-block-full-content-width>div>table>tbody>tr"
        );
        return {
          covidCases: Array.from(headlineNodes).map((a) => a.textContent),
        };
      });
      await page.screenshot({ path: "output6.png" });
      console.log(data6);

      // All about covid
      await page.goto(
        "https://www.healthline.com/health/coronavirus-covid-19#symptoms",
        { waitUntil: "load", timeout: 0 }
      );
      const data7 = await page.evaluate(async () => {
        await new Promise((resolve) => {
          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(() => {
            var scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
  
            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              resolve();
            }
          }, 65);
        });
        const headlineNodes = document.querySelectorAll(
          ".article-body.css-d2znx6.undefined"
        );
        return {
          covidCases: Array.from(headlineNodes).map((a) => a.textContent),
        };
      });
      await page.screenshot({ path: "output7.png" });
      console.log(data7);
  })();
}
main();
