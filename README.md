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