'use strict';

const ReportSummary = require('./report-summary');

module.exports = function homeView(reportSummaries) {
  let recentReports = reportSummaries.map((reportSummary) => {
    return new ReportSummary(reportSummary).toJSON();
  });

  return {
    controller_namespace: 'home',
    recent_reports: recentReports || []
  };
};
