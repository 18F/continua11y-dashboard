'use strict';

const server = require('./support/zombify');

describe('Home page', () => {
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
      done();
    });
  });
});
