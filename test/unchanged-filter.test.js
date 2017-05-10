'use strict';

const λ = require('highland');
const unchangedFilter = require('../source/unchanged-filter');

import { describe, beforeEach, it, jasmine, expect, jest } from './jasmine.js';

describe('unchanged filter', function() {
  let spy;

  beforeEach(function() {
    spy = jasmine.createSpy('spy');
  });

  it('should filter values that are the same as the previous', function() {
    λ([1, 8, 6, 6, 2, 8]).through(unchangedFilter).collect().each(spy);

    expect(spy).toHaveBeenCalledOnceWith([1, 8, 6, 2, 8]);
  });

  it('should deep compare values', function() {
    λ([
      {
        a: 'b',
        c: {
          d: 'e'
        }
      },
      {
        a: 'b',
        c: {
          d: 'e'
        }
      }
    ])
      .through(unchangedFilter)
      .collect()
      .each(spy);

    expect(spy).toHaveBeenCalledOnceWith([
      {
        a: 'b',
        c: {
          d: 'e'
        }
      }
    ]);
  });
});
