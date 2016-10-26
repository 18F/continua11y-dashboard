'use strict';

const assert               = require('assert');
const ValidateDataPresence = require('../../app/models/validate-data-presence');

describe('ValidateDataPresence', () => {
  let validator, data;

  beforeEach(() => {
    data = {foo: 'foo', bar: 'bar', baz: 'baz'};
  });

  describe('when all the data setup is present', () => {
    beforeEach(() => {
      validator = new ValidateDataPresence(data, ['bar', 'baz']);
    });

    it('should be valid', () => {
      assert(validator.valid());
    });

    it('should have an empty validation message', () => {
      assert.equal(validator.validationMessage(), '');
    });
  });

  describe('when data is missing', () => {
    beforeEach(() => {
      validator = new ValidateDataPresence(data, ['bar', 'baz', 'zoolander', 'gerbil']);
    });

    it('should not be valid', () => {
      assert(!validator.valid());
    });

    it('should have a validation message', () => {
      assert.equal(validator.validationMessage(), 'Data required for keys: zoolander, gerbil.');
    });

    it('validation message should be customizable', () => {
      assert.equal(validator.validationMessage('Data required within repo data for keys: '), 'Data required within repo data for keys: zoolander, gerbil.');
    });
  });
});
