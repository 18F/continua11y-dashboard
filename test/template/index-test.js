'use strict';

const assert    = require('assert');
const templates = require('../../app/templates');

describe('templates index', () => {
  before(() => {
    templates.load();
  });

  it('make available templates at the root level', () => {
    assert(templates['404_page']);
    assert(templates.home_page);
    assert(templates.layout);
  });

  it('does not load js files', () => {
    assert(!templates['index.js']);
  });

  it('gathers nested templates', () => {
    assert(templates.home.about.accesibility);
  });
});
