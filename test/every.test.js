'use strict';

const λ = require('highland');
const every = require('../source/every');

import { describe, beforeEach, it, jasmine, expect, jest } from './jasmine.js';

describe('every', function() {
  let spy;
  beforeEach(function() {
    spy = jasmine.createSpy('spy');
  });

  it('should return true if all items in the stream are true', function() {
    λ([true, 'true', 7]).through(every).each(spy);

    expect(spy).toHaveBeenCalledWith(7);
  });

  it('should return false if there is a falsey item in the stream', function() {
    λ([true, {}, 7, 0, [9]]).through(every).each(spy);

    expect(spy).toHaveBeenCalledWith(0);
  });

  it('should not process if the stream is empty', function() {
    λ([]).through(every).each(spy);

    expect(spy).not.toHaveBeenCalled();
  });
});
