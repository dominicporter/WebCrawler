const { crawl } = require('./crawl.js');
require('jest-fetch-mock').enableMocks();

describe('WebCrawler', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should fetch the page and return the links', async () => {
    // Arrange
    const sampleHtml = `
            <html><body>
                    <a href="/foo">Foo</a>
                    <a href="/bar">Bar</a>
            </body></html>
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
            <html><body>
                    <a href="/foo">Foo</a>
                    <a href="/">Home</a>
                    <a href="/bar">Bar</a>
                    <a href="/bar">Bar</a>
            </body></html>
        `;
    fetch.mockResponseOnce(sampleHtml);

    // Act
    const result = await crawl('https://www.asdfasdfasdf.com');

    // Assert
    expect(typeof result).toBe('object');
    expect(result['/']).toEqual(['/foo', '/bar']);
  });
  it('should only include internal page links', async () => {
    // Arrange
    const sampleHtml = `
            <html><body>
                    <a href="/foo">Foo</a>
                    <a href="https://foo.com/bar">Bar</a>
                    <a href="#bar">Bar</a>
                    <a href="/bar">Bar</a>
            </body></html>
        `;
    fetch.mockResponseOnce(sampleHtml);

    // Act
    const result = await crawl('https://www.asdfasdfasdf.com');

    // Assert
    expect(typeof result).toBe('object');
    expect(result['/']).toEqual(['/foo', '/bar']);
  });
  it('should include query params in the page keys', async () => {
    // Arrange
    const sampleHtml = `
            <html><body>
                    <a href="/foo">Foo</a>
                    <a href="/foo?baz=123">Baz</a>
                    <a href="/bar">Bar</a>
            </body></html>
        `;
    fetch.mockResponseOnce(sampleHtml);

    // Act
    const result = await crawl('https://www.asdfasdfasdf.com');

    // Assert
    expect(typeof result).toBe('object');
    expect(result['/']).toEqual(['/foo', '/foo?baz=123', '/bar']);
  });
  it('should fetch the page and return the links recursively', async () => {
    // Arrange
    const rootHtml = `
            <html><body>
                    <a href="/foo">Foo</a>
                    <a href="/bar">Bar</a>
            </body></html>
        `;
    fetch.mockResponseOnce(rootHtml); // 2 links
    const fooHtml = `
            <html><body>
                    <a href="/baz">Baz</a>
            </body></html>
        `;
    fetch.mockResponseOnce(fooHtml); // 1 link
    const barHtml = `
            <html><body>
                    <a href="https://www.example.com">external</a>
                    <a href="#blah">ignore</a>
            </body></html>
        `;
    fetch.mockResponseOnce(barHtml); // no internal links
    const bazHtml = `
            <html><body>
            </body></html>
        `;
    fetch.mockResponseOnce(bazHtml); // no links

    // Act
    const result = await crawl('https://www.asdfasdfasdf.com');

    // Assert
    expect(typeof result).toBe('object');
    expect(result).toEqual({
      '/': ['/foo', '/bar'],
      '/foo': ['/baz'],
      '/bar': [],
      '/baz': [],
    });
  });
});
