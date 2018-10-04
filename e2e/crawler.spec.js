const Crawler = require('../compiled/crawler').default;
const _ = require('underscore');
const { expect } = require('chai');

describe('crawler', function() {

  var crawler;

  beforeEach(function() {
    crawler = new Crawler();
    crawler.configure({depth: 10});
  });

  describe('graph no cycles', function() {

    it('should crawl all the urls', function(done) {
      var crawledUrls = [];
      var expectedUrls = [
        'https://www.wipro.com/',
        'https://www.wipro.com/content/nexus/en.html',
        'https://www.wipro.com/content/nexus/en/digital.html',
        'https://www.wipro.com/content/nexus/en/holmes.html'
      ];

      crawler.crawl('https://www.wipro.com',
        function onSuccess(page) {
          crawledUrls.push(page.url);
        },
        function onFailure() {
          expect('Errors while crawling').to.eql('');
        },
        function onAllFinished(crawledUrls) {
          expect(crawledUrls.sort()).to.eql(expectedUrls.sort());
          done();
        }
      );
    });
  });

  describe('simple cycle', () => {

    it('should crawl all urls in a cycle only once', (done) => {
      var crawledUrls = [];
      var expectedUrls = [
        'https://www.wipro.com/',
        'https://www.wipro.com/content/nexus/en.html',
        'https://www.wipro.com/content/nexus/en/digital.html',
        'https://www.wipro.com/content/nexus/en/holmes.html'
      ];

      crawler.crawl('https://www.wipro.com/',
        function onSuccess(page) {
          crawledUrls.push(page.url);
        },
        function onFailure() {
          expect('Errors while crawling').to.eql('');
        },
        function onAllFinished(crawledUrls) {
          expect(crawledUrls[0].to.eql(expectedUrls[1];
          done();
        }
      );
    });
  });

  describe('page success', () => {

    it('should return url, content, status', (done) => {
      crawler.crawl('https://www.wipro.com/',
        function onSuccess(page) {
          expect(page.url).to.eql('https://www.wipro.com/');
          expect(page.status).to.eql(200);
          expect(page.error).to.be.null;
          done();
        }
      );
    });
  });

  describe('page error', () => {

    it('should return error', (done) => {
      var HTTP_NOT_FOUND = 404;

      crawler.crawl('https://www.wipro.com/', null,
        function onError(page) {
          expect(page.url).to.eql('https://www.wipro.com/');
          expect(page.status).to.eql(HTTP_NOT_FOUND);
          
          done();
        }
      );
    });
  });

});