'use strict';

const ReportSummary = require('./report-summary');

module.exports = function showReport(report) {
  return new ReportSummary(report).toJSON();
};
