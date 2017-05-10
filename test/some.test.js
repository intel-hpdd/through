'use strict';

const λ = require('highland');
const some = require('../source/some');

import { describe, beforeEach, it, jasmine, expect, jest } from './jasmine.js';

describe('some', function() {
  let spy;

  beforeEach(function() {
    spy = jasmine.createSpy('spy');
  });

  it('should', function() {
    λ([0, false, NaN, 7, undefined, null]).through(some).each(spy);

    expect(spy).toHaveBeenCalledOnceWith(7);
  });
});
