'use strict';

const db                   = require('../config/db-connection');
const ValidateDataPresence = require('./validate-data-presence');

class InsertRecords {
  constructor(data) {
    this.data = data;
  }

  perform() {
    if ( !this.valid() ) {
      let message = this.validationMessage();
      return Promise.reject(new Error(message));
    }

    return db
      .insert(this.allAttributes(), this.returningColumns())
      .into(this.tableName());
  }

  allAttributes() {
    return this.data.map((itemData) => {
      return this.attributes(itemData);
    });
  }

  valid() {
    return this.validators().every((validator) => {
      return validator.valid();
    });
  }

  validationMessage() {
    let messages = this.validators().map((validator) => {
      return validator.validationMessage();
    });
    return messages.join(' ');
  }

  validators() {
    return this.data.map((itemData) => {
      return new ValidateDataPresence(itemData, this.requiredKeys());
    });
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

module.exports = InsertRecords;

