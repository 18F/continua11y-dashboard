'use strict';

const server                 = require('./support/test-server');
const contintua11yAcceptance = require('continua11y-acceptance');
const config                 = require('./support/continua11y-acceptance-config.json');

describe('Accessibility of public pages', function() {
  this.timeout(1000 * 10);

  let mobileTest, desktopTest;

  before((done) => {
    server.start(() => {
      mobileTest  = contintua11yAcceptance(config).test(server, 'mobile');
      desktopTest = contintua11yAcceptance(config).test(server, 'desktop');
      done();
    });
  });

  after((done) => {
    server.stop(done);
  });

  it('has an accessible home page in desktop view', (done) => {
    mobileTest.run('/', (err, results) => {
      if (err) { return done(err); }
      results.assertNoErrors();
      done();
    });
  });

  it('has an accessible home page in mobile view', (done) => {
    desktopTest.run('/', (err, results) => {
      if (err) { return done(err); }
      results.assertNoErrors();
      done();
    });
  });
});
