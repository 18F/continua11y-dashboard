'use strict';

class ValidateDataPresence {
  constructor(data, keys) {
    this.data = data;
    this.keys = keys;
  }

  valid() {
    return this.missingKeys().length === 0;
  }

  validationMessage(preface) {
    if (this.valid()) { return ''; }
    let message = preface || 'Data required for keys: ';
    message += this.missingKeys().join(', ');
    message += '.';
    return message;
  }

  missingKeys() {
    return this.keys.filter((key) => {
      return !this.data[key];
    });
  }
}

module.exports = ValidateDataPresence;
