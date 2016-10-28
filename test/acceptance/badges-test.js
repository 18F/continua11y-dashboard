'use strict';

const assert  = require('assert');
const request = require('request');
const server  = require('../support/test-server');
const clearDB = require('../support/clear-database');
const reqData = require('../fixtures/request-data/reports-success.json');

describe('Badges', () => {
  let address, response, body;

  function sendReportData(callback) {
    request({
      url: address + '/reports',
      method: 'POST',
      json: reqData
    }, callback);
  }

  function startServer(callback) {
    server.start((port) => {
      address = 'http://localhost:' + port;
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

  it('when the requested repository/branch does not exist, it returns a not-found badge', (done) => {
    request.get(address + '/badges/18F/continua11y-dashboard/no-one-home', (err, response, body) => {
      assert(body.includes('<svg'));
      assert(body.includes('NA'));
      done(err);
    });
  });

  it('when the requested repository/branch exist, it returns the right badge', (done) => {
    request.get(address + '/badges/18F/continua11y-dashboard/master', (err, response, body) => {
      assert(body.includes('<svg'));
      assert(body.includes('0 errors'));
      done(err);
    });
  });
});

