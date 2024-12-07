## Web Crawler Project

We want a script which will scrape a web page, extract the internal links, follow them, and repeat until we have a picture of the whole site structure.

User Story:
As a developer
I want a script that crawls a website and gets all internal links
So that I can see the structure of the site

AC:
- Given a website URL
- When I run the script on that URL
- Then I see a list of all the pages on that site and which pages link to them
- And I don't see any external links
- And I don't see pages listed twice

## Tech Analysis
- We want to just use simple web fetching and analyse the text results (ie no scraping libraries).
- Recursive function to build up table should work.
- Global table & mutation to avoid passing large amounts of data to each recursive call.
- Consider concurency - will it be ok to fire off parallel requests to all the links in a page? If not maybe batch them and send a few at a time.
- What about links that are in external JS packages, so not in the page source? For this we'd probably need a headless browser or virtual DOM... Probably out of the scopt of this project for now.

## Running
`nvm use` (or just install node 20)

`npm i`

`npm run go`

## Tests
`npm i`

`npm test`


## Further work
- Consider what to do with query params. Some query params do change the content of a page (and therefore may change the links visible) so it may be necessary to crawl the same page multiple times with different query params. But user may know for a given site that re-fetching with different params is a waste of time. Perhaps add an optional parameter like `ignoreQueryParams`.
- Breadth First vs Depth First search. See TODO comment in code. The slightly naive implementation needs a hacky check to make sure we don't crawl the same page twice (while waiting for the branch it is on to return). Breadth First would solve this probably.
- How Deep? It would be useful to have an optional parameter to specify how many levels of search we want to do, both for faster results if user is only interested in the main links, and to reduce memory usage. Some sites could have hundreds or thousands of links which would make the table really big.
- Comments in source are currently parsed like any other href - perhaps we want to ignore links that are commented out?
- Visualisation - we could display the output in a nicer 'tree-like' format
- JS links - consider using a headless browser or virtual DOM to see if there are any links encoded in logic. Possibly even crawl the JS files themselves.