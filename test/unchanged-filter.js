'use strict';

var λ = require('highland');
var unchangedFilter = require('../unchanged-filter');

describe('unchanged filter', function () {
  var spy;

  beforeEach(function () {
    spy = jasmine.createSpy('spy');
  });

  it('should filter values that are the same as the previous', function () {
    λ([1, 8, 6, 6, 2, 8])
      .through(unchangedFilter)
      .collect()
      .each(spy);

    expect(spy).toHaveBeenCalledOnceWith([1,8,6,2,8]);
  });

  it('should deep compare values', function () {
    λ([
      {
        a: 'b',
        c: {
          d: 'e'
        }
      },
      {
        a: 'b',
        c: {
          d: 'e'
        }
      }])
      .through(unchangedFilter)
      .collect()
      .each(spy);

    expect(spy).toHaveBeenCalledOnceWith([
      {
        a: 'b',
        c: {
          d: 'e'
        }
      }
    ]);
  });
});
