// @flow

import highland from 'highland';
import some from '../source/some.js';

import { describe, beforeEach, it, jasmine, expect } from './jasmine.js';

describe('some', () => {
  let spy;

  beforeEach(() => {
    spy = jasmine.createSpy('spy');
  });

  it('should show if any of the items are truthy', () => {
    highland([0, false, NaN, 7, undefined, null]).through(some).each(spy);

    expect(spy).toHaveBeenCalledWith(7);
  });
});
