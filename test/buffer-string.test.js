'use strict';

const λ = require('highland');
const bufferString = require('../source/buffer-string');

import { describe, beforeEach, it, jasmine, expect, jest } from './jasmine.js';

describe('buffer string', function() {
  let spy;

  beforeEach(function() {
    spy = jasmine.createSpy('spy');
  });

  it('should work with a single chunk', function() {
    λ(['foo']).through(bufferString).each(spy);

    expect(spy).toHaveBeenCalledOnceWith('foo');
  });

  it('should work with multiple chunks', function() {
    λ([new Buffer('f'), new Buffer('o'), new Buffer('o'), new Buffer('!')])
      .through(bufferString)
      .each(spy);

    expect(spy).toHaveBeenCalledOnceWith('foo!');
  });

  it('should not buffer an empty stream', function() {
    const spy = jasmine.createSpy('spy');

    λ([]).through(bufferString).each(spy);

    expect(spy).not.toHaveBeenCalledOnce();
  });
});
