'use strict';

var λ = require('highland');
var pluckValues = require('../pluck-values');
var format = require('util').format;

describe('pluck values', function () {
  var spy;

  beforeEach(function () {
    spy = jasmine.createSpy('spy');

    λ([
      {
        make: 'kia',
        model: 'forte',
        color: 'silver',
        year: 2010
      },
      {
        make: 'gmc',
        model: 'terrain',
        color: 'blue',
        year: 2015
      }
    ])
      .through(pluckValues(['color', 'year']))
      .each(spy);
  });

  [
    {
      entry: 'first',
      expected: ['silver', 2010]
    },
    {
      entry: 'second',
      expected: ['blue', 2015]
    }
  ].forEach(function (item) {
    it(format('should pluck the color and year from the %s entry', item.entry), function () {
      expect(spy).toHaveBeenCalledOnceWith(item.expected);
    });
  });
});
