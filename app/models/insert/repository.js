'use strict';

const InsertRecord = require('./record');

class Repository extends InsertRecord {
  attributes() {
    return {
      owner: this.data.owner,
      name: this.data.repo,
      created_at: new Date(),
      updated_at: new Date()
    };
  }

  tableName() {
    return 'repositories';
  }

  requiredKeys() {
    return ['owner', 'repo'];
  }

  returningColumns() {
    return ['id', 'owner', 'name', 'created_at', 'updated_at'];
  }
}

module.exports = Repository;
