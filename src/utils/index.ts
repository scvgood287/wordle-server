import puppeteer from 'puppeteer'; 

// puppeteer

export const searchWords = async (length: string | number, word: string, isFindTodaysWord: boolean = true): Promise<string[]> => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: { width: 1280, height: 960 }, devtools: true });

  try {
    const page = await browser.newPage();

    await page.goto(`https://www.wordhippo.com/what-is/starting-with/${length}-letter-words-${word}.html`);

    let wordsTable = await page.waitForSelector("table[border='0'][cellspacing='0'][cellpadding='5'][width='100%']:not(.pagetable)");
    const lastPage = await page.$("td.wordlinktext > span.wordlinksmall:last-child");

    if (isFindTodaysWord && lastPage) {
      const lastIndex = await lastPage.evaluate(el => el.innerHTML);

      await page.addScriptTag({ content: `goToGameWordFinderPage('starting-with','${getRandomNumber(1, Number(lastIndex))}')` });
  
      // await page.evaluate((i) => eval(`goToGameWordFinderPage('starting-with','${i}')`), getRandomNumber(1, Number(lastIndex)));
    };

    wordsTable = await page.waitForSelector("table[border='0'][cellspacing='0'][cellpadding='5'][width='100%']:not(.pagetable)");

    const words = await wordsTable.$$eval("tr[class]", (elements) => {
      return [...[...elements].reduce((acc, element) => {
        const childs = element.children;

        for (let i = 0; i < childs.length; i++) {
          const child = childs.item(i) as HTMLElement;
          const innerText = child.innerText.replace(/(\s*)/g, "");

          if (innerText) {
            acc.add(innerText);
          };
        };

        return acc;
      }, new Set<string>())];
    });

    return words;
  } catch (e) {
    console.log(e);
  } finally {
    await browser.close();
  };
};

export const searchTodaysWords = async (): Promise<string[]> => {
  const words = await searchWords(getRandomNumber(4, 8), String.fromCharCode(getRandomNumber(97, 122)));

  return words;
};

export const isRealWord = async (word: string): Promise<boolean> => {
  const words = await searchWords(word.length, word, false);

  return words.length > 0;
};

// else

export const getRandomNumber = (start: number, end: number): number => Math.floor(Math.random() * (end - start)) + start;

export const getToday = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);

  return `${year}-${month}-${day}`;
};