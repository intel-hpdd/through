import highland from 'highland';
import bufferString from '../source/buffer-string.js';

import { describe, beforeEach, it, jasmine, expect } from './jasmine.js';

describe('buffer string', () => {
  let spy;

  beforeEach(() => {
    spy = jasmine.createSpy('spy');
  });

  it('should work with a single chunk', () => {
    highland(['foo']).through(bufferString).each(spy);

    expect(spy).toHaveBeenCalledWith('foo');
  });

  it('should work with multiple chunks', () => {
    highland([
      new Buffer('f'),
      new Buffer('o'),
      new Buffer('o'),
      new Buffer('!')
    ])
      .through(bufferString)
      .each(spy);

    expect(spy).toHaveBeenCalledWith('foo!');
  });

  it('should not buffer an empty stream', () => {
    const spy = jasmine.createSpy('spy');

    highland([]).through(bufferString).each(spy);

    expect(spy).not.toHaveBeenCalled();
  });
});
