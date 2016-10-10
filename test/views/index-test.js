'use strict';

const assert    = require('assert');
const views     = require('../../app/views');

describe('views index', () => {
  before(() => {
    views.load();
  });

  it('make available views at the root level', () => {
    assert(views.home);
    assert(views.layout);
  });
});

