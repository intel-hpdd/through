// @flow

import highland from 'highland';
import sortBy from '../source/sort-by.js';

import { describe, beforeEach, it, jasmine, expect } from './jasmine.js';

describe('sort by', () => {
  let spy;

  beforeEach(() => {
    spy = jasmine.createSpy('spy');
  });

  it('should sort', () => {
    highland([
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
