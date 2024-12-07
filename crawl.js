const crawledList = [];

const crawl = async (url, siteMap = {}) => {
  const urlObj = new URL(url);
  if (urlObj.pathname === '/') crawledList.length = 0;

  // Crawl the site
  const response = await fetch(url);
  const body = await response.text();

  const links = body.match(/href="\/[^"]*"/g);
  const onlyLinks = links?.map((link) => {
    return link.replace('href="', '').replace('"', '');
  });

  // url.origin is the domain
  const dedupedLinks = Array.from(new Set(onlyLinks)).filter(
    (link) => link !== urlObj.pathname
  );

  const fullPath = urlObj.href.split('/').reverse()[0];
  siteMap[`/${fullPath}`] = dedupedLinks;

  // Recursively crawl the site
  for (const link of dedupedLinks) {
    if (!siteMap[link]) {
      console.log(`Crawling ${link} from ${fullPath}`);

      // TODO: refactor this so we don't need to keep a separate 'checklist'
      // This is needed because we are doing a depth first search
      // Possibly refactoring to a breadth first search would mitigate this
      if (crawledList.includes(link)) {
        continue;
      } else {
        crawledList.push(link);
      }
      await crawl(`${urlObj.origin}${link}`, siteMap);
    }
  }

  return siteMap;
};

module.exports = { crawl };
