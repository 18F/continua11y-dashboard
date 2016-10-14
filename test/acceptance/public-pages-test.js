'use strict';

const server = require('./support/zombify');

describe('Public pages', () => {
  let browser;

  before((done) => {
    server.start((b) => {
      browser = b;
      done();
    });
  });

  it('home page is successful', (done) => {
    browser.visit('/', () => {
      browser.assert.success();
      browser.assert.text('h1', 'Make accessibility part of your build');
      done();
    });
  });

  it('not found pages, work too', (done) => {
    browser.visit('/who-is-what?', () => {
      browser.assert.status(404);
      done();
    });
  });

  it('does a 500 error well too', (done) => {
    browser.visit('/fail', () => {
      browser.assert.status(500);
      done();
    });
  });
});
