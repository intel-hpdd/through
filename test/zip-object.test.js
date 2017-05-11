// @flow

import highland from 'highland';
import zipObject from '../source/zip-object.js';

import { describe, beforeEach, it, jasmine, expect } from './jasmine.js';

describe('zip object', () => {
  let spy;

  beforeEach(() => {
    spy = jasmine.createSpy('spy');
  });

  it('should zip data into an object', () => {
    highland(['kia', 'forte', 2010, 'blue'])
      .through(zipObject(['make', 'model', 'year', 'color']))
      .each(spy);
    expect(spy).toHaveBeenCalledWith({
      make: 'kia',
      model: 'forte',
      year: 2010,
      color: 'blue'
    });
  });
});
