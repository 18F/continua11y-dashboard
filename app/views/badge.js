'use strict';

const _             = require('lodash');
const reportStatus  = require('../models/report-status');

module.exports = function badgeView(data) {
  return {
    linear_gradient_id: _.uniqueId('gradient_'),
    mask_id: _.uniqueId('mask_'),
    color: errorColor,
    message: message
  };

  function errorColor() {
    let statusName = reportStatus.status(data.stats);
    return reportStatus.colorFor(statusName);
  }

  function message() {
    return data.stats.error  + ' errors';
  }
};

module.exports.nullView = function () {
  return {
    linear_gradient_id: 'linear_gradient_id',
    mask_id: 'mask_id',
    color: reportStatus.colorFor(),
    message: '- NA -'
  };
};
