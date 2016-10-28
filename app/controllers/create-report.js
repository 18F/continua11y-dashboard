'use strict';

const SaveReport = require('../models/save-report');

module.exports = function createReport(req, res) {
  new SaveReport(req.body)
    .perform()
    .then(() => {
      res.status(200);
      res.json({all: 'good'});
    })
    .catch((err) => {
      res.status(500);
      res.json({
        error: err.message,
        //trace: err.stack
      });
    });
};
