'use strict';

var λ = require('highland');
var collectValues = require('../collect-values');

describe('collect values', function () {
  var spy;

  beforeEach(function () {
    spy = jasmine.createSpy('spy');
  });

  it('should collect values into an array', function () {
    λ([1, 2, 3])
      .through(collectValues)
      .each(spy);

    expect(spy).toHaveBeenCalledOnceWith([1, 2, 3]);
  });

  it('should not represent an empty stream as an array', function () {
    λ([])
      .through(collectValues)
      .each(spy);

    expect(spy).not.toHaveBeenCalled();
  });
});
