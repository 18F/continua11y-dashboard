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

function colorFor(status) {
  let color = '757575';

  if (status === STATUSES.bad) {
    color = 'cd2026';
  } else if (status === STATUSES.ok) {
    color = 'fdb81e';
  } else if (status === STATUSES.good) {
    color = '44cc11';
  }

  return color;
}

module.exports = {
  STATUSES: STATUSES,
  status: status,
  colorFor: colorFor
};
