'use strict';

const assert        = require('assert');
const reqData       = require('../fixtures/request-data/reports-success');
const clearDB       = require('../support/clear-database');
const SaveReport    = require('../../app/models/save-report');
const db            = require('../../app/config/db-connection');
const query         = require('../../app/models/query/report');

describe('queryReport', () => {
  beforeEach((done) => {
    clearDB(done);
  });

  describe('.recent(limit)', () => {
    beforeEach((done) => {
       db
        .insert([
          {repository_id: Math.round(Math.random() * 5), branch: 'master', commit: 3, run_at: new Date(1477353645451)},
          {repository_id: Math.round(Math.random() * 4), branch: 'master', commit: 4, run_at: new Date(1477353745451)},
          {repository_id: Math.round(Math.random() * 3), branch: 'master', commit: 1, run_at: new Date(1477353045451)},
          {repository_id: Math.round(Math.random() * 2), branch: 'master', commit: 2, run_at: new Date(1477353345451)},
        ])
        .into('reports')
        .then(() => { done(); })
        .catch(done);
    });

    it('returns them ordered by date run_at', (done) => {
      query
        .recent()
        .then((results) => {
          assert.equal(results[0].commit, 4);
          assert.equal(results[1].commit, 3);
          assert.equal(results[2].commit, 2);
          assert.equal(results[3].commit, 1);
        })
        .then(done)
        .catch(done);
    });

    it('respects the limit passed in', (done) => {
      query
        .recent(2)
        .then((results) => {
          assert.equal(results.length, 2);
        })
        .then(done)
        .catch(done);
    });
  });

  describe('.summary(ids)', () => {
    let storedData, reportIds;

    function saveReport(runAt) {
      let data = Object.assign(reqData, {timestamp: Date.parse(runAt)});
      return new SaveReport(data).perform();
    }

    beforeEach((done) => {
      storedData = [];
      reportIds = [];
      saveReport('October 22, 2016')
        .then((data) => {
          storedData.push(data);
          reportIds.push(data.report.id);
          return saveReport('September 1, 2016');
        })
        .then((data) => {
          storedData.push(data);
          reportIds.push(data.report.id);
          done();
        })
        .catch(done);
    });

    it('includes a data set for each report id', (done) => {
      query
        .summary(reportIds)
        .then((results) => {
          assert.equal(results.length, 2);
          assert.equal(results[0].branch, 'master');
          assert.equal(results[1].branch, 'master');
        })
        .then(done)
        .catch(done);
    });

    it('includes the repository record', (done) => {
      query
        .summary(reportIds)
        .then((results) => {
          assert.equal(results[0].repository.name, 'continua11y-dashboard');
          assert.equal(results[0].repository.owner, '18F');
          assert.equal(results[0].repository.id, results[1].repository.id);
        })
        .then(done)
        .catch(done);
    });

    it('pageCounts(ids) query works on its own', (done) => {
      query
        .pageCounts(reportIds)
        .then((results) => {
          assert.equal(results[reportIds[0]], 2);
          assert.equal(results[reportIds[1]], 2);
        })
        .then(done)
        .catch(done);
    });

    it('includes the page count', (done) => {
      query
        .summary(reportIds)
        .then((results) => {
          assert.equal(results[0].page_count, 2);
          assert.equal(results[1].page_count, 2);
        })
        .then(done)
        .catch(done);
    });

    it('stats(ids) query works on its own', (done) => {
      query
        .stats(reportIds)
        .then((results) => {
          assert.deepEqual(results[reportIds[0]], {error: 0, warning: 11, notice: 34});
          assert.deepEqual(results[reportIds[1]], {error: 0, warning: 11, notice: 34});
        })
        .then(done)
        .catch(done);
    });

    it('includes sums of the errors, warnings and notices', (done) => {
      query
        .summary(reportIds)
        .then((results) => {
          assert.deepEqual(results[0].stats, {error: 0, warning: 11, notice: 34});
          assert.deepEqual(results[1].stats, {error: 0, warning: 11, notice: 34});
        })
        .then(done)
        .catch(done);
    });
  });
});
