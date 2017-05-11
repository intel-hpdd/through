// @flow

import highland from 'highland';
import every from '../source/every.js';

import { describe, beforeEach, it, jasmine, expect } from './jasmine.js';

describe('every', () => {
  let spy;
  beforeEach(() => {
    spy = jasmine.createSpy('spy');
  });

  it('should return true if all items in the stream are true', () => {
    highland([true, 'true', 7]).through(every).each(spy);

    expect(spy).toHaveBeenCalledWith(7);
  });

  it('should return false if there is a falsey item in the stream', () => {
    highland([true, {}, 7, 0, [9]]).through(every).each(spy);

    expect(spy).toHaveBeenCalledWith(0);
  });

  it('should not process if the stream is empty', () => {
    highland([]).through(every).each(spy);

    expect(spy).not.toHaveBeenCalled();
  });
});
