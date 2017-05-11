// @flow

import { describe, beforeEach, it, jasmine, expect } from './jasmine.js';

import highland from 'highland';
import collectValues from '../source/collect-values.js';

describe('collect values', () => {
  let spy;

  beforeEach(() => {
    spy = jasmine.createSpy('spy');
  });

  it('should collect values into an array', () => {
    highland([1, 2, 3]).through(collectValues).each(spy);

    expect(spy).toHaveBeenCalledWith([1, 2, 3]);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not represent an empty stream as an array', () => {
    highland([]).through(collectValues).each(spy);

    expect(spy).not.toHaveBeenCalled();
  });
});
