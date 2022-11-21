const { firefox } = require('playwright');
const fs = require('fs');

const GLOBAL = {
  USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:106.0) Gecko/20100101 Firefox/106.0',
};

const getBrowser = () => {
  return firefox.launch({
    headless: true, // 'headless' 옵션은 스크래핑을 자동으로 동작하는 가상 브라우저를 보여줄지를 설정합니다. true : 숨김, false : 숨기지 않음.
  });
};

const getPage = (browser) => {
  const { USER_AGENT: userAgent } = GLOBAL; // Destructuring assignment
  return browser.newPage({ userAgent });
};

const scrap = async (page, url) => {
  await page.goto(url);

  const titles = await page.$eval('.fixed thead', (target) => {
    let data = [];

    data.push('변경연도');
    target.querySelectorAll('tr th').forEach((element) => {
      data.push(element.innerText.trim()); // trim() : 텍스트 앞뒤로 공백 제거
    });

    return data;
  });

  const values = await page.$eval('.fixed tbody', (target) => {
    let data = [];

    target.querySelectorAll('tr td').forEach((element) => {
      data.push(element.innerText.trim());
    });

    return data;
  });

  const getTitlesText = () => titles.join(',');

  const getValuesText = () => {
    let result = '';

    values.forEach((value, i) => {
      if (i % 3 !== 0) {
        // 첫 td가 아니면 구분자(,) 추가
        value = ',' + value;
      }

      if (i % 3 === 2) {
        //  마지막 td면 개행(\n) 추가
        value += '\n';
      }

      result += value;
    });

    return result;
  };

  return getTitlesText() + '\n' + getValuesText();
};

const writeFileByScrapping = (result, ext = 'csv') => {
  const fileDir = './result';
  !fs.existsSync(fileDir) && fs.mkdirSync(fileDir);
  const fileName = `${fileDir}/${Date.now()}.${ext}`;

  let fileFormat = null;
  if (ext === 'csv') {
    fileFormat = '\ufeff' + result;
  } else {
    fileFormat = result;
  }

  const charset = 'utf8';

  fs.writeFile(fileName, fileFormat, charset, (error) => {
    if (error) {
      console.log(error);
    }

    console.log(`${fileName} is written!`);
  });
};

const init = async () => {
  const browser = await getBrowser();
  const page = await getPage(browser);
  const url = 'https://www.bok.or.kr/portal/singl/baseRate/list.do?dataSeCd=01&menuNo=200643';
  const result = await scrap(page, url);
  // console.log('result :\n' + result);
  await writeFileByScrapping(result);
  await browser.close();
};

init();
