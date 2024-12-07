const { crawl } = require('./crawl.js');

crawl('https://www.overstory.com/').then(console.log);
