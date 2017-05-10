'use strict';

const λ = require('highland');
const collectMap = require('../source/collect-map');

import { describe, beforeEach, it, jasmine, expect, jest } from './jasmine.js';

describe('collect map', function() {
  let spy;

  beforeEach(function() {
    spy = jasmine.createSpy('spy');
  });

  it('should map values and collect the results', function() {
    λ([1, 2, 3]).through(collectMap(square)).each(spy);

    expect(spy).toHaveBeenCalledOnceWith([1, 4, 9]);
  });

  function square(x) {
    return x * x;
  }
});
