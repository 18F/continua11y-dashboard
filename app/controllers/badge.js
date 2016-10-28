'use strict';

const Mustache          = require('mustache');
const reportQuery       = require('../models/query/report');
const templates         = require('../templates');
const badgeView         = require('../views/badge');

module.exports = function badge(req, res) {
  let params = req.params;

  reportQuery
    .reportByRepoAndBranch(params.owner, params.name, params.branch)
    .then(getSummary)
    .then(renderSVG);

  function renderSVG(reportSummary) {
    let svg = renderBadge(reportSummary);
    res.set('Content-Type', 'image/svg+xml;charset=utf-8');
    res.send(svg);
  }
};

function getSummary(results) {
  let report = results[0];
  if (report) {
    return reportQuery.summary([report.id]);
  } else {
    return Promise.resolve(report);
  }
}

function renderBadge(results) {
  let template = templates.badge;
  let view = dataView(results);
  return Mustache.render(template, view);
}

function dataView(results) {
  if (!results) { return badgeView.nullView(); }
  return badgeView(results[0]);
}
