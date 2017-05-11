// @flow

import highland from 'highland';
import unchangedFilter from '../source/unchanged-filter.js';

import { describe, beforeEach, it, jasmine, expect } from './jasmine.js';

describe('unchanged filter', () => {
  let spy;

  beforeEach(() => {
    spy = jasmine.createSpy('spy');
  });

  it('should filter values that are the same as the previous', () => {
    highland([1, 8, 6, 6, 2, 8]).through(unchangedFilter).collect().each(spy);

    expect(spy).toHaveBeenCalledWith([1, 8, 6, 2, 8]);
  });

  it('should deep compare values', () => {
    highland([
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

    expect(spy).toHaveBeenCalledWith([
      {
        a: 'b',
        c: {
          d: 'e'
        }
      }
    ]);
  });
});
