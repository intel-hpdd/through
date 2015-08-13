'use strict';

var λ = require('highland');
var every = require('../every');

describe('every', function () {

  var spy;
  beforeEach(function () {
    spy = jasmine.createSpy('spy');
  });

  it('should return true if all items in the stream are true', function () {
    λ([true, 'true', 7])
      .through(every)
      .each(spy);

    expect(spy).toHaveBeenCalledWith(7);
  });

  it('should return false if there is a falsey item in the stream', function () {
    λ([true, {}, 7, 0, [9]])
      .through(every)
      .each(spy);

    expect(spy).toHaveBeenCalledWith(0);
  });

  it('should not process if the stream is empty', function () {
    λ([])
      .through(every)
      .each(spy);

    expect(spy).not.toHaveBeenCalled();
  });
});
