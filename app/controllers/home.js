'use strict';

const layoutData = require('../view-models/layout');

module.exports = function home(req, res) {
  res.render('layout', layoutData);
};
