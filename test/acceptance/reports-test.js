'use strict';

const assert  = require('assert');
const request = require('request');
const server  = require('../support/zombify');
const clearDB = require('../support/clear-database');
const reqData = require('../fixtures/request-data/reports-success.json');

describe('Reports', () => {
  let browser, response, body;

  function sendReportData(callback) {
    request({
      url: 'http://localhost:' + browser.port + '/reports',
      method: 'POST',
      json: reqData
    }, callback);
  }

  function startServer(callback) {
    server.start((b) => {
      browser = b;
      sendReportData((err, res, b) => {
        response = res;
        body = b;
        callback(err);
      });
    });
  }

  // NOTE this is one data setup per whole file/suite!
  before((done) => {
    clearDB(() => { startServer(done); });
  });

  after((done) => {
    server.stop(done);
  });

  it('post request sending the report is successful', () => {
    assert.equal(response.statusCode, 200);
  });

  it('shows the report stats on the home page, as a recent report', (done) => {
    browser.visit('/', () => {
      browser.assert.text('.report-summary .stats', '0 errors 11 warnings 34 notices');
      done();
    });
  });

  it('has a report details page', (done) => {
    browser.visit('/', () => {
      browser.clickLink('.recent-summary')
        .then(() => {
          browser.assert.success();
          browser.assert.text('h4', '18F/continua11y-dashboard');
          done();
        });
    });
  });
});
