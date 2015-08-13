'use strict';

var λ = require('highland');
var collectMap = require('../collect-map');

describe('collect map', function () {
  var spy;

  beforeEach(function () {
    spy = jasmine.createSpy('spy');
  });

  it('should map values and collect the results', function () {
    λ([1, 2, 3])
      .through(collectMap(square))
      .each(spy);

    expect(spy).toHaveBeenCalledOnceWith([1, 4, 9]);
  });

  function square (x) {
    return x * x;
  }
});
