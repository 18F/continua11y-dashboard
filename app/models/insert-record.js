'use strict';

const db                   = require('../config/db-connection');
const ValidateDataPresence = require('./validate-data-presence');

class InsertRecord {
  constructor(data) {
    this.data = data;
  }

  // returns a promise
  perform() {
    if ( !this.validator().valid() ) {
      let message = this.validator().validationMessage(this.validationMessagePreface());
      return Promise.reject(new Error(message));
    }

    return db
      .insert(this.attributes(), this.returningColumns())
      .into(this.tableName());
  }

  validator() {
    return new ValidateDataPresence(this.data, this.requiredKeys());
  }

  attributes() {
    throw new Error('implement attributes in your subclass');
  }

  tableName() {
    throw new Error('implement tableName in your subclass');
  }

  requiredKeys() {
    throw new Error('implement requiredKeys in your subclass');
  }

  returningColumns() {
    return ['id'];
  }

  validationMessagePreface() { /* no op */ }
}

module.exports = InsertRecord;

