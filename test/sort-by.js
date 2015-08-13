'use strict';

var λ = require('highland');
var sortBy = require('../sort-by');

describe('sort by', function () {
  var spy;

  beforeEach(function () {
    spy = jasmine.createSpy('spy');
  });

  it('should sort', function () {
    λ([
      {
        name: 'foo',
        id: 23
      },
      {
        name: 'bar',
        id: 3
      },
      {
        name: 'baz',
        id: 15
      }
    ])
      .through(sortBy(function (a, b) {
        return a.id - b.id;
      }))
      .collect()
      .each(spy);

    expect(spy).toHaveBeenCalledWith([
      {
        name: 'bar',
        id: 3
      },
      {
        name: 'baz',
        id: 15
      },
      {
        name: 'foo',
        id: 23
      }
    ]);
  });
});
