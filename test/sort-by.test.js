// @flow

import highland from 'highland';
import sortBy from '../source/sort-by.js';

import { describe, beforeEach, it, jasmine, expect } from './jasmine.js';

describe('sort by', () => {
  let spy;
  type NameAndId = {
    name: string,
    id: number
  };

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
      .through(sortBy((a, b) => a.id - b.id))
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
