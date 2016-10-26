'use strict';

const SaveReport = require('../models/save-report');

module.exports = function createReport(req, res) {
  new SaveReport(req.body).perform((err) => {
    if (err) {
      res.status(500);
      res.json({error: err.message});
    } else {
      res.status(200);
      res.end({all: 'good'});
    }
  });
};
