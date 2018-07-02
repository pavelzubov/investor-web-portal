var puppeteer = require("puppeteer");

const indexOfUrl = process.argv.indexOf("testUrl") + 1;
const url = process.argv[indexOfUrl];

const isDebugging = () => {
  const debugging_mode = {
    headless: false,
    slowMo: 250,
    devtools: true
  };
  return process.env.NODE_ENV === "debug" ? debugging_mode : {};
};

const screenSize = {
  width: 1280,
  height: 768
};

describe("auth tests", () => {
  let browser;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: ["--no-sandbox"]
    });
  });

  afterAll(async () => {
    browser.close();
  });

  it(
    "corrent log in",
    async () => {
      let page = await browser.newPage();
      await page.setViewport(screenSize);
      await page.goto(url);
      await page.waitForSelector("#auth");
      await page.click("#auth");
      await page.waitForSelector("#loginForm");
      await page.click("input[type=email]");
      await page.type("input[type=email]", "e.grebenshikov@genesis.vision");
      await page.click("input[type=password]");
      await page.type("input[type=password]", "qwerty");
      await page.click("#loginSubmit");
      await page.waitFor(2000);
      await page.screenshot({
        path: "./integrated-tests/screenshot/logined.png"
      });
      const html = await page.$eval("#auth", e => e.innerHTML);
      expect(html).toBe("Sign Out");
    },
    30000
  );

  it("correct log out", async () => {
    let page = await browser.newPage();
    await page.setViewport(screenSize);
    await page.goto(url);
    await page.waitForSelector("#auth");
    await page.click("#auth");
    await page.waitFor(2000);
    const html = await page.$eval("#auth", e => e.innerHTML);
    expect(html).toBe("Sign In");
  });

  it(
    "uncorrect sign in",
    async () => {
      let page = await browser.newPage();
      await page.setViewport(screenSize);
      await page.goto(url);
      await page.waitForSelector("#auth");
      await page.click("#auth");
      await page.waitForSelector("#loginForm");
      await page.click("input[type=email]");
      await page.type("input[type=email]", "e.123@mail.rdf");
      await page.click("input[type=password]");
      await page.type("input[type=password]", "qwerty");
      await page.click("#loginSubmit");
      await page.waitFor(2000);
      await page.screenshot({
        path: "./integrated-tests/screenshot/error.png"
      });
      const html = await page.$eval(".text-danger strong", e => e.innerHTML);
      expect(html).toBe("Wrong email/password");
    },
    60000
  );
});
