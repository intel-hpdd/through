// @flow

import highland from 'highland';
import limit from '../source/limit.js';

import { describe, beforeEach, it, jasmine, expect } from './jasmine.js';

describe('limit', () => {
  let spy;
  beforeEach(() => {
    spy = jasmine.createSpy('spy');
  });

  it('should rate limit the stream', function(done) {
    highland([1, 2, 3, 4, 5])
      .through(limit(20))
      .each(spy)
      .observe()
      .done(() => {
        expect(spy).toHaveBeenCalledWith(5);
        done();
      });
  });

  it('should handle errors', done => {
    const err = new Error('foo error');
    highland(push => {
      push(null, 1);
      push(err, 'error');
      push(null, 7);
      push(null, highland.nil);
    })
      .through(limit(20))
      .errors((err, push) => {
        spy(err);
        push(null, { foo: 'bar' });
      })
      .each(() => {})
      .observe()
      .done(() => {
        expect(spy).toHaveBeenCalledWith(err);
        expect(spy).toHaveBeenCalledTimes(2);
        done();
      });
  });
});
