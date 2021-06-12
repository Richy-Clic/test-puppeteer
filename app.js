
const puppeteer = require('puppeteer');

(async () => {

  // create a browser and new page whit headless: false to see Chromium in action
  const browser = await puppeteer.launch({ headless: false});
  const page = await browser.newPage();

  // get the first task list from andomtodolistgenerator.herokuapp.com
  await page.goto('https://randomtodolistgenerator.herokuapp.com/library');
  const tasks = await page.evaluate(() => {

      const DATA = document.querySelectorAll('.tasks-card-container .task-title div');
      let list_tasks = [];
      DATA.forEach(title => {
        list_tasks.push(title.textContent);
      });
      return list_tasks;

  })

  // login in todoist
  await page.goto('https://todoist.com/app/today');
  await page.waitForSelector('#email');
  await page.type('#email', 'richy.deanda@gmail.com');
  await page.type('#password', 'PuppeteerPass12');
  await page.click('.submit_btn');

  // Clic over the new task button
  await page.waitForSelector('#editor');
  await page.waitForTimeout(2000);
  await page.click('li .plus_add_button');

  
  // iterate over the array of tasks and create only 5 task in todoist
  for (let index = 0; index < 5; index++) {

    await page.type('.public-DraftStyleDefault-block span', tasks[index]);
    await page.waitForTimeout(3000);
    await page.click('.ist_button');

  }

  // only to see the result for 5s before close the browser
  await page.waitForTimeout(5000);
  await browser.close();

})();