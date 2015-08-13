'use strict';

var λ = require('highland');
var some = require('../some');

describe('some', function () {
  var spy;

  beforeEach(function () {
    spy = jasmine.createSpy('spy');
  });

  it('should', function () {
    λ([0,false, NaN, 7, undefined, null])
      .through(some)
      .each(spy);

    expect(spy).toHaveBeenCalledOnceWith(7);
  });
});
