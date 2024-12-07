const { crawl } = require('./crawl.js');

crawl('https://www.overstory.com/').then((result) => {
    console.log(result)
    console.log(Object.keys(result).length + ' pages crawled');
});
