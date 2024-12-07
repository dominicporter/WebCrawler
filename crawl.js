const crawl = async (url) => {
  const urlObj = new URL(url);

  // Crawl the site
  const response = await fetch(url);
  const body = await response.text();

  const links = body.match(/href="\/[^"]*"/g);
  const onlyLinks = links.map((link) => {
    return link.replace('href="', '').replace('"', '');
  });

  // url.origin is the domain
  const dedupedLinks = Array.from(new Set(onlyLinks)).filter(
    (link) => link !== urlObj.pathname
  );

  return { [urlObj.pathname]: dedupedLinks };
};

module.exports = { crawl };
