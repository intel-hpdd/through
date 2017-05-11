import highland from 'highland';
import collectMap from '../source/collect-map.js';

import { describe, beforeEach, it, jasmine, expect } from './jasmine.js';

const square = x => x * x;

describe('collect map', () => {
  let spy;

  beforeEach(() => {
    spy = jasmine.createSpy('spy');
  });

  it('should map values and collect the results', () => {
    highland([1, 2, 3]).through(collectMap(square)).each(spy);

    expect(spy).toHaveBeenCalledWith([1, 4, 9]);
  });
});
