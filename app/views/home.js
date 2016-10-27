'use strict';

module.exports = function homeView(reportSummaries) {
  let recentReports = createReportSummaryViews(reportSummaries);

  return {
    controller_namespace: 'home',
    recent_reports: recentReports || []
  };
};

function createReportSummaryViews(reportSummaries) {
  return reportSummaries.map((reportSummary) => {
    return new ReportSummary(reportSummary).toJSON();
  });
}

class ReportSummary {
  constructor(reportSummary) {
    this.reportSummary = reportSummary;
  }

  status() {
    return status(this.reportSummary.stats);
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
      icon_text: this.iconText()
    });
  }
}

const STATUS = {
  bad: 'bad',
  ok: 'ok',
  good: 'good'
};

// this should go outside somewhere!
function status(stats) {
  let status = STATUS.bad;
  let errorCount = parseInt(stats.error);

  if (errorCount < 50) {
    status = STATUS.ok;
  }

  if (errorCount === 0) {
    status = STATUS.good;
  }

  return status;
}
