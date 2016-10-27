'use strict';

const MustacheRenderer = require('../mustache-renderer');
const reportsQuery     = require('../models/query/report');

module.exports = function home(req, res) {
  reportsQuery
    .recent()
    .then((results) => {
      return results.map((record) => { return record.id; });
    })
    .then((ids) => {
      return reportsQuery.summary(ids);
    })
    .then((recentReports) => {
      let renderer = new HomeRenderer('home', recentReports);
      res.send(renderer.render());
    });
};

class HomeRenderer extends MustacheRenderer {
  partials() {
    return Object.assign(
      {},
      MustacheRenderer.templates.home,
      {report_summary: MustacheRenderer.templates.reports.summary},
      {page: this.pageTemplate()}
    );
  }
}
