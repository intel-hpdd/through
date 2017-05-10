'use strict';

const λ = require('highland');
const toJson = require('../source/to-json');
const fp = require('intel-fp');
const format = require('util').format;

import { describe, beforeEach, it, jasmine, expect, jest } from './jasmine.js';

describe('to json', function() {
  let spy, obj, stringifiedObj;

  beforeEach(function() {
    spy = jasmine.createSpy('spy');
    obj = {
      foo: {
        bar: {
          baz: [1, 2, 3]
        }
      }
    };
    stringifiedObj = JSON.stringify(obj);
  });

  it('should convert JSON data to an object', function() {
    λ([stringifiedObj]).through(toJson).each(spy);

    expect(spy).toHaveBeenCalledOnceWith(obj);
  });

  it('should throw an error if the object passed cannot be parsed', function() {
    λ(['[' + stringifiedObj])
      .through(toJson)
      .errors(function(err, push) {
        spy(err);
        push(null, err);
      })
      .each(fp.noop);

    expect(spy).toHaveBeenCalledOnceWith(
      new Error(format('Could not parse %s%s to JSON.', '[', stringifiedObj))
    );
  });
});
