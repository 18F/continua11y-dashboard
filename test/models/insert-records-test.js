'use strict';

const assert = require('assert');

const db                     = require('../../app/config/db-connection');
const InsertPages            = require('../../app/models/insert/pages'); // subclass!

describe('InsertRecords via subclass InsertPages', function() {
  let inserter;

  beforeEach((done) => {
    db('pages').del().then(() => { done(); });
  });

  describe('when data is invalid', () => {
    beforeEach(() => {
      inserter = new InsertPages([{}]);
    });

    it('returns a rejected promise', (done) => {
      inserter
        .perform()
        .then(() => { done(new Error('promise resolved')); })
        .catch(() => {
          done();
        });
    });
  });

  describe('when data is valid', () => {
    beforeEach(() => {
      inserter = new InsertPages([
        {report_id: 2, path: '/hello-a11y', size: 'mobile'},
        {report_id: 2, path: '/hello-a11y', size: 'tablet'},
        {report_id: 2, path: '/', size: 'mobile'}
      ]);
    });

    it('saves all the record and returns the data', (done) => {
      inserter
        .perform()
        .then((results) => {
          assert.equal(results.length, 3);

          let foundRecords = results.filter((record) => {
            return record.path === '/hello-a11y';
          });
          assert.equal(foundRecords.length, 2);

          foundRecords = results.filter((record) => {
            return record.size === 'tablet';
          });
          assert.equal(foundRecords.length, 1);

          foundRecords = results.filter((record) => {
            return record.size === 'mobile';
          });
          assert.equal(foundRecords.length, 2);

          done();
        })
        .catch(done);
    });
  });
});
