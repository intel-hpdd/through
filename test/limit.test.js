'use strict';

const λ = require('highland');
const limit = require('../source/limit');
const fp = require('intel-fp');

import { describe, beforeEach, it, jasmine, expect, jest } from './jasmine.js';

describe('limit', function() {
  let spy, s;
  beforeEach(function() {
    spy = jasmine.createSpy('spy');
  });

  it('should rate limit the stream', function(done) {
    s = λ([1, 2, 3, 4, 5])
      .through(limit(20))
      .each(spy)
      .observe()
      .done(function() {
        expect(spy).toHaveBeenCalledOnceWith(5);
        done();
      });
  });

  it('should handle errors', function(done) {
    const err = new Error('foo error');
    s = λ(function createStream(push) {
      push(null, 1);
      push(err, 'error');
      push(null, 7);
      push(null, λ.nil);
    })
      .through(limit(20))
      .errors(function(err, push) {
        spy(err);
        push(null, { foo: 'bar' });
      })
      .each(fp.noop)
      .observe()
      .done(function() {
        expect(spy).toHaveBeenCalledTwiceWith(err);
        done();
      });
  });
});
