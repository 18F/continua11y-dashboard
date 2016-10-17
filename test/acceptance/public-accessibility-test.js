'use strict';

const server            = require('./support/test-server');
const acessibility      = require('./support/test-accessibility');
const pa11y             = require('pa11y');
const assert            = require('assert');

describe('Accessibility of public pages', function() {
  this.timeout(1000 * 10);

  let port;

  before((done) => {
    server.start((p) => {
      port = p;
      done();
    });
  });

  after((done) => {
    server.stop(done);
  });

  it('has an accessible home page in desktop view', (done) => {
    acessibility.testDesktop(server, '/', (results) => {
      results.assertNoErrors();
      done();
    });
  });

  it('has an accessible home page in mobile view', (done) => {
    acessibility.testMobile(server, '/', (results) => {
      results.assertNoErrors();
      done();
    });
  });
});
