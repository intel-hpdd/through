'use strict';

const λ = require('highland');
const sortBy = require('../source/sort-by');

import { describe, beforeEach, it, jasmine, expect, jest } from './jasmine.js';

describe('sort by', function() {
  let spy;

  beforeEach(function() {
    spy = jasmine.createSpy('spy');
  });

  it('should sort', function() {
    λ([
      {
        name: 'foo',
        id: 23
      },
      {
        name: 'bar',
        id: 3
      },
      {
        name: 'baz',
        id: 15
      }
    ])
      .through(
        sortBy(function(a, b) {
          return a.id - b.id;
        })
      )
      .collect()
      .each(spy);

    expect(spy).toHaveBeenCalledWith([
      {
        name: 'bar',
        id: 3
      },
      {
        name: 'baz',
        id: 15
      },
      {
        name: 'foo',
        id: 23
      }
    ]);
  });
});
