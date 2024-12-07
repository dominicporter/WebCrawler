const { crawl } = require('./crawl.js');
require('jest-fetch-mock').enableMocks();

describe('WebCrawler', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('should fetch the page and return the links', async () => {
        // Arrange
        const sampleHtml = `
            <html>
                <body>
                    <a href="/foo">Foo</a>
                    <a href="/bar">Bar</a>
                </body>
            </html>
        `;
        fetch.mockResponseOnce(sampleHtml);

        // Act
        const result = await crawl('https://www.asdfasdfasdf.com');

        // Assert
        expect(typeof result).toBe('object');
        expect(result['/']).toEqual(['/foo', '/bar']);
    });

    it('should not include duplicate links or links to itself', async () => {
        // Arrange
        const sampleHtml = `
            <html>
                <body>
                    <a href="/foo">Foo</a>
                    <a href="/">Home</a>
                    <a href="/bar">Bar</a>
                    <a href="/bar">Bar</a>
                </body>
            </html>
        `;
        fetch.mockResponseOnce(sampleHtml);

        // Act
        const result = await crawl('https://www.asdfasdfasdf.com');

        // Assert
        expect(typeof result).toBe('object');
        expect(result['/']).toEqual(['/foo', '/bar']);
    });
    it.todo('should not fetch external links');
    it.todo('should fetch the page and return the links recursively');
});