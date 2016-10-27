'use strict';

const reportStatus = require('../models/report-status');

class ReportSummary {
  constructor(reportSummary) {
    this.reportSummary = reportSummary;
  }

  status() {
    return reportStatus.status(this.reportSummary.stats);
  }

  path() {
    return '/reports/' + this.reportSummary.id;
  }

  iconText() {
    let symbol = this.errorCount();
    if (symbol === 0) { symbol = '&#x2713;'; }
    return symbol;
  }

  errorCount() {
    return parseInt(this.reportSummary.stats.error);
  }

  toJSON() {
    return Object.assign({}, this.reportSummary, {
      status: this.status(),
      icon_text: this.iconText(),
      path: this.path()
    });
  }
}

module.exports = ReportSummary;
