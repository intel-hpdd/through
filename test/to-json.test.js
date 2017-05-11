// @flow

import highland from 'highland';
import toJson from '../source/to-json.js';

import { describe, beforeEach, it, jasmine, expect } from './jasmine.js';

describe('to json', () => {
  let spy, obj, stringifiedObj;

  beforeEach(() => {
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

  it('should convert JSON data to an object', () => {
    highland([stringifiedObj]).through(toJson).each(spy);

    expect(spy).toHaveBeenCalledWith(obj);
  });

  it('should throw an error if the object passed cannot be parsed', () => {
    highland(['[' + stringifiedObj])
      .through(toJson)
      .errors(function(err, push) {
        spy(err);
        push(null, err);
      })
      .each(() => {});

    expect(spy).toHaveBeenCalledWith(
      new Error(
        `Could not parse [${stringifiedObj} to JSON.`,
        '[',
        stringifiedObj
      )
    );
  });
});
