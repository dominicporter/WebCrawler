const crawl = async (url) => {
  // Crawl the site
  const response = await fetch(url);
  const body = await response.text();

  const links = body.match(/href="[^"]*"/g);
  const onlyLinks = links.map((link) => {
    return link.replace('href="', '').replace('"', '');
  });

  return { '/': onlyLinks };
};

module.exports = { crawl };