'use strict';

const λ = require('highland');
const bufferLines = require('../source/buffer-lines');

import { describe, beforeEach, it, jasmine, expect, jest } from './jasmine.js';

describe('buffer lines', function() {
  let spy;

  beforeEach(function() {
    spy = jasmine.createSpy('spy');
  });

  describe('receives a single chunk containing multiple lines', function() {
    beforeEach(function() {
      λ(['foo\nbar']).through(bufferLines).each(spy);
    });

    it('should receive the first line', function() {
      expect(spy).toHaveBeenCalledWith('foo');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should receive the second line', function() {
      expect(spy).toHaveBeenCalledOnceWith('bar');
    });
  });

  describe('receives multiple chunks containing multiple lines', function() {
    beforeEach(function() {
      spy = jasmine.createSpy('spy');

      λ([
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

    it('should receive the first line', function() {
      expect(spy).toHaveBeenCalledOnceWith('foo');
    });

    it('should receive the second line', function() {
      expect(spy).toHaveBeenCalledOnceWith('bar');
    });
  });

  it('should not buffer an empty stream', function() {
    λ([]).through(bufferLines).each(spy);

    expect(spy).not.toHaveBeenCalledOnce();
  });
});
