'use strict';

const pa11y  = require('pa11y');
const assert = require('assert');

function testDesktop(server, path, callback) {
  let test = generateTest(desktopSize);
  runTest(test, server, path, callback);
}

function testMobile(server, path, callback) {
  let test = generateTest(desktopSize);
  runTest(test, server, path, callback);
}

function generateTest(size, options) {
  options = options || {};
  return pa11y({
    page: { viewport: size }
  });
}

function runTest(test, server, path, callback) {
  let port = server.address().port;
  let host = server.address().address;
  if (host === '::') {
    host = 'localhost';
  }

  test.run('http://' + host + ':' + port + path, (err, results) => {
    if (err) { throw err; }
    callback(new Results(results));
  });
}

let mobileSize = {
  width: 320,
  height: 400
};

let desktopSize = {
  width: 1200,
  height: 800
};

class Results {
  constructor(data) {
    this.data = data;
  }

  assertNoErrors() {
    assert(this.errors().length === 0);
  }

  assertErrorsLessThan(threshold) {
    assert(this.errors().length <= threshold);
  }

  assertWarningsLessThan(threshold) {
    assert(this.warnings().length <= threshold);
  }

  assertNoticesLessThan(threshold) {
    assert(this.notices().length <= threshold);
  }

  errors() {
    return this.getByType('error');
  }

  warnings() {
    return this.getByType('warning');
  }

  notices() {
    return this.getByType('notice');
  }

  getByType(type) {
    return this.data.filter((incident) => { return incident.type === type; });
  }
}

module.exports = {
  Results: Results,
  generateTest: generateTest,
  runTest: runTest,
  mobileSize: mobileSize,
  desktopSize: desktopSize,
  testDesktop: testDesktop,
  testMobile: testMobile
};
