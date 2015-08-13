'use strict';

var λ = require('highland');
var zipObject = require('../zip-object');

describe('zip object', function () {
  var spy;

  beforeEach(function () {
    spy = jasmine.createSpy('spy');
  });

  it('should zip data into an object', function () {
    λ(['kia', 'forte', 2010, 'blue'])
      .through(zipObject(['make', 'model', 'year', 'color']))
      .each(spy);
    expect(spy).toHaveBeenCalledOnceWith({
      make: 'kia',
      model: 'forte',
      year: 2010,
      color: 'blue'
    });
  });
});
