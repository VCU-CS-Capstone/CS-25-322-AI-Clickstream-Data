const puppeteer = require('puppeteer');

const TARGET_URL = 'https://cs-25-322-ai-clickstream-data.onrender.com';

const helpTopics = [
  { name: 'Credit Cards' },
  { name: 'Bank Accounts' },
  { name: 'Auto Financing' },
  { name: 'Report Fraud' }
];

const subtopics = {
  'Credit Cards': [
    'View Transactions', 'Pay Credit Card Bill', 'Manage Rewards',
    'Set Spending Limits', 'Report Lost/Stolen Card', 'Request a Credit Limit Increase'
  ],
  'Bank Accounts': [
    'View Balance', 'View Transactions', 'Transfer Money', 'Deposit Money'
  ],
  'Auto Financing': [
    'View Auto Loan Balance', 'Make a Payment', 'Check Interest Rates', 'Refinance Auto Loan'
  ],
  'Report Fraud': [
    'Report Unauthorized Transaction', 'Freeze Card', 'Contact Fraud Support'
  ]
};

const randomDelay = (min = 300, max = 1000) =>
  new Promise(res => setTimeout(res, Math.floor(Math.random() * (max - min)) + min));

async function simulateUser(userIndex) {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForSelector('.bottom-banner-button', { timeout: 10000 });

    // Simulate thinking after the page load
    console.log(`- User ${userIndex + 1} thinking about what to click first...`);
    await randomDelay(2000, 4000);

    // 1 in every 5 users will click a single top icon
    if (userIndex % 5 === 0) {
      const iconSelectors = [
        { label: 'Phone Icon', selector: 'a[href^="tel:"]' },
        { label: 'Email Icon', selector: 'a[href^="mailto:"]' },
        { label: 'Support Icon', selector: 'a[href="/redirect"]' }
      ];

      const selectedIcon = iconSelectors[Math.floor(Math.random() * iconSelectors.length)];

      const clicked = await page.evaluate((selector) => {
        const el = document.querySelector(selector);
        if (el) el.click();
        return !!el;
      }, selectedIcon.selector);

      if (clicked) {
        console.log(`- User ${userIndex + 1} clicked: ${selectedIcon.label}`);
        if (selectedIcon.label === 'Phone Icon') iconClickStats.phone++;
        if (selectedIcon.label === 'Email Icon') iconClickStats.email++;
        if (selectedIcon.label === 'Support Icon') iconClickStats.support++;
        await randomDelay(300, 800);
      }
    }


    // Choose a topic
    const topic = helpTopics[Math.floor(Math.random() * helpTopics.length)];
    const topicName = topic.name;
    const topicSubtopics = subtopics[topicName];

    console.log(`- User ${userIndex + 1}: "${topicName}"`);

    await randomDelay(1500, 3000); // Simulate pause before clicking topic

    await page.evaluate((topicName) => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes(topicName));
      if (btn) btn.click();
    }, topicName);

    await randomDelay(1000, 1500);

    // Confused user goes back randomly
    if (Math.random() > 0.7) {
      console.log(`- User ${userIndex + 1} got confused and hit back`);
      await page.goBack();
      await randomDelay(1000, 2000);
      await page.evaluate((topicName) => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes(topicName));
        if (btn) btn.click();
      }, topicName);
      await randomDelay(1000, 1500);
    }

    // Click 10–20 subtopics
    const clickCount = Math.floor(Math.random() * 10) + 10;
    for (let i = 0; i < clickCount; i++) {
      const sub = topicSubtopics[Math.floor(Math.random() * topicSubtopics.length)];
      console.log(`- User ${userIndex + 1} hovering over: "${sub}"`);
      await randomDelay(1200, 2500); // Thinking before subtopic click

      await page.evaluate((label) => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes(label));
        if (btn) btn.click();
      }, sub);

      await randomDelay(300, 800); // After click pause
    }

    // 50% chance of frustration (repeat click)
    if (Math.random() > 0.5) {
      const repeated = topicSubtopics[Math.floor(Math.random() * topicSubtopics.length)];
      console.log(`- User ${userIndex + 1} frustrated: repeatedly clicked "${repeated}"`);
      await randomDelay(1000, 2000); 
      for (let i = 0; i < 3; i++) {
        await page.evaluate((label) => {
          const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes(label));
          if (btn) btn.click();
        }, repeated);
        await randomDelay(200, 600);
      }
    }

    await browser.close();
    console.log(`- User ${userIndex + 1} complete.`);
  } catch (error) {
    console.error(`-  User ${userIndex + 1} failed:`, error.message);
  }
}

async function runInBatches(tasks, batchSize) {
  const results = [];
  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(fn => fn()));
    results.push(...batchResults);
  }
  return results;
}

// Running x users in parallel (change userCount don't change concurrencyLimit)
(async () => {
  const userCount = 10;
  const concurrencyLimit = 10;

  const tasks = [];
  for (let i = 0; i < userCount; i++) {
    tasks.push(() => simulateUser(i));
  }

  await runInBatches(tasks, concurrencyLimit);

  console.log(`All ${userCount} users done.`);
})();
