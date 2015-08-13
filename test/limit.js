'use strict';

var λ = require('highland');
var limit = require('../limit');
var fp = require('@intel-js/fp');

describe('limit', function () {
  var spy, s;
  beforeEach(function () {
    spy = jasmine.createSpy('spy');
  });

  it('should rate limit the stream', function (done) {
    s = λ([1,2,3,4,5])
      .through(limit(20))
      .each(spy)
      .observe()
      .done(function () {
        expect(spy).toHaveBeenCalledOnceWith(5);
        done();
      });
  });

  it('should handle errors', function (done) {
    var err = new Error('foo error');
    s = λ(function createStream (push) {
      push(null, 1);
      push(err, 'error');
      push(null, 7);
      push(null, λ.nil);
    })
      .through(limit(20))
      .errors(function (err, push) {
        spy(err);
        push(null, {foo: 'bar'});
      })
      .each(fp.noop)
      .observe()
      .done(function () {
        expect(spy).toHaveBeenCalledTwiceWith(err);
        done();
      });
  });
});
