'use strict';

const db              = require('../../config/db-connection');
const repositoryQuery = require('./repository');

module.exports.recent = function recent(limit) {
  return db
    .select()
    .from('reports')
    .limit(limit || 20)
    .orderBy('run_at', 'desc');
};

module.exports.byIds = function byIds(ids) {
  return db
    .select()
    .from('reports')
    .orderBy('run_at', 'desc')
    .whereIn('id', ids);
};

module.exports.pageCounts = function pageCounts(ids) {
  return db('pages')
    .select('report_id', db.raw('count(report_id)'))
    .groupBy('report_id')
    .whereIn('report_id', ids)
    .then((results) => {
      let counts = {};
      results.forEach((record) => {
        counts[record.report_id] = record.count;
      });
      return counts;
    });
};

module.exports.stats = function stats(ids) {
  return db('issues')
    .join('pages', 'pages.id', 'issues.page_id')
    .join('reports', 'pages.report_id', 'reports.id')
    .whereIn('reports.id', ids)
    .select('reports.id', db.raw('count(reports.id) as issue_count'), 'issues.type')
    .groupBy('reports.id', 'issues.type')
    .then((results) => {
      let stats = {};
      results.forEach((record) => {
        stats[record.id] = stats[record.id] || {
          error: 0, warning: 0, notice: 0
        };
        stats[record.id][record.type] = record.issue_count;
      });
      return stats;
    });
};

module.exports.summary = function summary(ids) {
  let reports, repositories, pageCounts, stats;

  return this.byIds(ids)
    .then((results) => {
      reports = results;
      return reports.map((record) => { return record.repository_id; });
    })
    .then((repositoryIds) => {
      return repositoryQuery.byIds(repositoryIds);
    })
    .then((results) => {
      repositories = results;
    })
    .then(() => {
      return this.pageCounts(ids);
    })
    .then((results) => {
      pageCounts = results;
    })
    .then(() => {
      return this.stats(ids);
    })
    .then((results) => {
      stats = results;
    })
    .then(() => {
      return marryData(reports, repositories, pageCounts, stats);
    });
};

function marryData(reports, repositories, pageCounts, stats) {
  reports.forEach((report, i) => {
    let repository = repositories.find((repo) => { return report.repository_id === repo.id; });
    reports[i].repository = repository || {};
    reports[i].page_count = pageCounts[report.id] || {};
    reports[i].stats      = stats[report.id] || {};
  });

  return reports;
}

module.exports.reportByRepoAndBranch = function reportByRepoAndBranch(owner, name, branch) {
  return db('reports')
    .select('reports.id')
    .join('repositories', 'repositories.id', 'reports.repository_id')
    .where('repositories.owner', owner)
    .where('repositories.name', name)
    .where('reports.branch', branch)
    .orderBy('run_at', 'desc');
};
