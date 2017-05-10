'use strict';

const λ = require('highland');
const zipObject = require('../source/zip-object');

import { describe, beforeEach, it, jasmine, expect, jest } from './jasmine.js';

describe('zip object', function() {
  let spy;

  beforeEach(function() {
    spy = jasmine.createSpy('spy');
  });

  it('should zip data into an object', function() {
    λ(['kia', 'forte', 2010, 'blue'])
      .through(zipObject(['make', 'model', 'year', 'color']))
      .each(spy);
    expect(spy).toHaveBeenCalledOnceWith({
      make: 'kia',
      model: 'forte',
      year: 2010,
      color: 'blue'
    });
  });
});
