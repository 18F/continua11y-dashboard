'use strict';

const STATUSES = {
  bad: 'bad',
  ok: 'ok',
  good: 'good'
};

// this should go outside somewhere!
function status(stats) {
  let status = STATUSES.bad;
  let errorCount = parseInt(stats.error);

  if (errorCount < 50) {
    status = STATUSES.ok;
  }

  if (errorCount === 0) {
    status = STATUSES.good;
  }

  return status;
}

module.exports = {
  STATUSES: STATUSES,
  status: status
};
