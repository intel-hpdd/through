'use strict';

var λ = require('highland');
var flatPluckPath = require('../flat-pluck-path');

describe('flat pluck path', function () {
  var spy;
  beforeEach(function () {
    spy = jasmine.createSpy('spy');
  });

  it('should pluck the path', function () {
    λ([{
      body: {
        objects: [
          {
            name: 'Joe'
          }
        ]
      }
    },
    {
      body: {
        objects: [
          {
            name: 'Wayne'
          }
        ]
      }
    },
    {
      body: {
        objects: [
          {
            name: 'Will'
          }
        ]
      }
    }])
    .through(flatPluckPath(['body', 'objects']))
    .collect()
    .each(spy);

    expect(spy).toHaveBeenCalledWith([{name: 'Joe'}, {name: 'Wayne'}, {name: 'Will'}]);
  });
});
