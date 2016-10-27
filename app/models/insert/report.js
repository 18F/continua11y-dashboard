'use strict';

const InsertRecord = require('./record');

class Report extends InsertRecord {
  attributes() {
    return {
      repository_id: this.data.repository_id,
      branch: this.data.branch,
      commit: this.data.commit,
      pull_request: this.data.pull_request,
      run_at: new Date(this.data.timestamp)
    };
  }

  tableName() {
    return 'reports';
  }

  requiredKeys() {
    return ['repository_id', 'branch', 'commit'];
  }

  returningColumns() {
    return ['id', 'repository_id', 'branch', 'commit', 'pull_request', 'run_at'];
  }
}

module.exports = Report;
