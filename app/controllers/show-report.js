'use strict';

const reportQuery       = require('../models/query/report');
const MustacheRenderer  = require('../mustache-renderer');

module.exports = function showReport(req, res) {
  reportQuery
    .summary([req.params.id])
    .then((results) => {
      let rendered = new Renderer('show-report', results[0]).render();
      res.send(rendered);
    });
};

class Renderer extends MustacheRenderer {
  partials() {
    return Object.assign(
      {},
      MustacheRenderer.templates['show-report'],
      {report_summary: MustacheRenderer.templates.reports.summary},
      {page: this.pageTemplate()}
    );
  }
}
