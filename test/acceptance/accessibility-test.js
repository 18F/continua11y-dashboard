'use strict';

const async                   = require('async');
const contintua11yAcceptance  = require('continua11y-acceptance');

const server                  = require('../support/test-server');
const config                  = require('../support/continua11y-acceptance-config.json');
const accessibilityAcceptance = contintua11yAcceptance(config);

describe('Accessibility of public pages', function() {
  this.timeout(1000 * 10);

  let mobileTest, desktopTest;

  before((done) => {
    server.start(() => {
      mobileTest  = accessibilityAcceptance.test(server, 'mobile');
      desktopTest = accessibilityAcceptance.test(server, 'desktop');
      accessibilityAcceptance.clearReport(done);
    });
  });

  after((done) => {
    server.stop(done);
  });

  it('has an accessible home page in all views', (done) => {
    async.each([mobileTest, desktopTest], (test, next) => {
      test.run('/', (err, results) => {
        if (err) { return next(err); }
        results.assertNoErrors();
        next();
      });
    }, done);
  });
});
