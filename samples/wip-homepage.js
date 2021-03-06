/*
 * Demonstrates how we can filter out which urls should be crawled.
 */
var Crawler = require("js-crawler").default;
var urlsCrawledCount = 0;
var topLevelUrl = "https://www.wipro.com/";

var crawler = new Crawler().configure({
  shouldCrawl: function(url) {
    return (url.indexOf("wipro.com") > 0) || (topLevelUrl === url);
  }
});

crawler.crawl(topLevelUrl, function(page) {
 // console.log(page.url);
  urlsCrawledCount++;
}, null, function onAllFinished(crawledUrls) {
  console.log('Plain text =====================');
  console.log(crawledUrls);
  console.log('Urls crawled = ', crawledUrls.length);
});