'use strict';

const assert    = require('assert');
const templates = require('../../app/templates');

describe('templates index', () => {
  before(() => {
    templates.load();
  });

  it('make available templates at the root level', () => {
    assert(templates.raw['404']);
    assert(templates.raw.home);
    assert(templates.raw.layout);
  });

  it('does not load js files', () => {
    assert(!templates.raw['index.js']);
  });

  it('gathers nested templates', () => {
    assert(templates.raw.home_partials.about.accesibility);
  });
});
