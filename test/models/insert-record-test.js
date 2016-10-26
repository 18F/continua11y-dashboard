'use strict';

const assert = require('assert');

const db                     = require('../../app/config/db-connection');
const InsertRepositoryRecord = require('../../app/models/insert/repository'); // subclass!

describe('InsertRecord', function() {
  let inserter;

  beforeEach((done) => {
    db('repositories').del().then(() => { done(); });
  });

  describe('when data is invalid', () => {
    beforeEach(() => {
      inserter = new InsertRepositoryRecord({});
    });

    it('returns a rejected promise', (done) => {
      inserter
        .perform()
        .then(() => { done(new Error('promise resolved')); })
        .catch((e) => {
          assert.equal(e.message, 'Data required for keys: owner, repo.');
          done();
        });
    });
  });

  describe('when data is valid', () => {
    beforeEach(() => {
      inserter = new InsertRepositoryRecord({repo: 'hello-a11y', owner: '18F'});
    });

    it('saves the record and returns the data', (done) => {
      inserter
        .perform()
        .then((results) => {
          let record = results[0];
          assert(record.id);
          assert.equal(record.name, 'hello-a11y');
          assert.equal(record.owner, '18F');
          done();
        })
        .catch(done);
    });
  });
});
