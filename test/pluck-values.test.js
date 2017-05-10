'use strict';

const λ = require('highland');
const pluckValues = require('../source/pluck-values');
const format = require('util').format;

import { describe, beforeEach, it, jasmine, expect, jest } from './jasmine.js';

describe('pluck values', function() {
  let spy;

  beforeEach(function() {
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
  ].forEach(function(item) {
    it(
      format('should pluck the color and year from the %s entry', item.entry),
      function() {
        expect(spy).toHaveBeenCalledOnceWith(item.expected);
      }
    );
  });
});
