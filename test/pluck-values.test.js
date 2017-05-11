// @flow

import highland from 'highland';
import pluckValues from '../source/pluck-values.js';

import { describe, beforeEach, it, jasmine, expect } from './jasmine.js';

describe('pluck values', () => {
  let spy;

  beforeEach(() => {
    spy = jasmine.createSpy('spy');

    highland([
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
  ].forEach(function(item) {
    it(`should pluck the color and year from the ${item.entry} entry`, () => {
      expect(spy).toHaveBeenCalledWith(item.expected);
    });
  });
});
