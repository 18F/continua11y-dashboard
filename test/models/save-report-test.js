'use strict';

const db            = require('../../app/config/db-connection');

const assert        = require('assert');

const reqData       = require('../fixtures/request-data/reports-success');
const SaveReport    = require('../../app/models/save-report');

describe('SaveReport', function() {
  let creator;

  beforeEach((done) => {
    creator = new SaveReport(reqData);
    // sorry for the xmas tree, putting theses in a Promise.all
    // was just stalling
    db('repositories').del().then(() => {
      db('reports').del().then(() => {
        db('pages').del().then(() => {
          db('issues').del().then(done);
        });
      });
    });
  });

  describe('when all is well', () => {
    it('creates a repository', (done) => {
      creator
        .perform()
        .then((savedData) => {
          let repository = savedData.repository;
          assert.equal(repository.owner, '18F');
          assert.equal(repository.name , 'continua11y-dashboard');
          done();
        })
        .catch(done);
    });

    it('saves the report', (done) => {
      creator
        .perform()
        .then((savedData) => {
          let report = savedData.report;
          assert.equal(report.branch, 'master');
          assert.equal(report.commit, reqData.commit);
          assert.equal(report.pull_request, false);
          assert.equal(report.run_at.toString(), new Date(reqData.timestamp).toString());
          done();
        })
        .catch(done);
    });

    it('saves each page', (done) => {
      creator
        .perform()
        .then((savedData) => {
          let pages = savedData.pages;
          assert.equal(pages.length, 2);
          assert.equal(pages[0].path, '/');
          assert.equal(pages[0].size, 'desktop');
          assert.equal(pages[1].path, '/');
          assert.equal(pages[1].size, 'mobile');
          done();
        })
        .catch(done);
    });
  });

  describe('when the repository already exists', () => {
    beforeEach((done) => {
      db
        .insert({owner: reqData.owner, name: reqData.repo})
        .into('repositories')
        .then(() => { done(); })
        .catch(done);
    });

    it('does not duplicate it', (done) => {
      creator
        .perform()
        .then((savedData) => {
          let repository = savedData.repository;
          assert.equal(repository.owner, '18F');
          assert.equal(repository.name , 'continua11y-dashboard');

          db
            .select()
            .from('repositories')
            .then((results) => {
              assert.equal(results.length, 1);
              assert.equal(results[0].owner, reqData.owner);
              assert.equal(results[0].name, reqData.repo);
              done();
            });
        })
        .catch(done);
    });
  });

  describe('when data is invalid', () => {
    beforeEach(() => {
      creator = new SaveReport({});
    });

    it('rejects theh promise', (done) => {
      creator
        .perform()
        .then(() => {
          done(new Error('promise not rejected'));
        })
        .catch(() => {
          done();
        });
    });
  });
});

