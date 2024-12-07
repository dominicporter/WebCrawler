const crawl = async (url, siteMap = {}) => {
  const urlObj = new URL(url);

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

  siteMap[urlObj.pathname] = dedupedLinks;

  // Recursively crawl the site
  for (const link of dedupedLinks) {
    if (!siteMap[link]) {
      console.log(`Crawling ${urlObj.origin}${link}`);
      await crawl(`${urlObj.origin}${link}`, siteMap);
    }
  }

  return siteMap
};

module.exports = { crawl };
