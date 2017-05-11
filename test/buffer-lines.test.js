// @flow

import highland from 'highland';
import bufferLines from '../source/buffer-lines.js';

import { describe, beforeEach, it, jasmine, expect } from './jasmine.js';

describe('buffer lines', () => {
  let spy;

  beforeEach(() => {
    spy = jasmine.createSpy('spy');
  });

  describe('receives a single chunk containing multiple lines', () => {
    beforeEach(() => {
      highland(['foo\nbar']).through(bufferLines).each(spy);
    });

    it('should receive the first line', () => {
      expect(spy).toHaveBeenCalledWith('foo');
    });

    it('should receive the second line', () => {
      expect(spy).toHaveBeenCalledWith('bar');
    });
  });

  describe('receives multiple chunks containing multiple lines', () => {
    beforeEach(() => {
      spy = jasmine.createSpy('spy');

      highland([
        new Buffer('f'),
        new Buffer('o'),
        new Buffer('o'),
        new Buffer('\n'),
        new Buffer('b'),
        new Buffer('a'),
        new Buffer('r')
      ])
        .through(bufferLines)
        .each(spy);
    });

    it('should receive the first line', () => {
      expect(spy).toHaveBeenCalledWith('foo');
    });

    it('should receive the second line', () => {
      expect(spy).toHaveBeenCalledWith('bar');
    });
  });

  it('should not buffer an empty stream', () => {
    highland([]).through(bufferLines).each(spy);

    expect(spy).not.toHaveBeenCalled();
  });
});
