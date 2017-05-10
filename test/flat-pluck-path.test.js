'use strict';

const λ = require('highland');
const flatPluckPath = require('../source/flat-pluck-path');

import { describe, beforeEach, it, jasmine, expect, jest } from './jasmine.js';

describe('flat pluck path', function() {
  let spy;
  beforeEach(function() {
    spy = jasmine.createSpy('spy');
  });

  it('should pluck the path', function() {
    λ([
      {
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
      }
    ])
      .through(flatPluckPath(['body', 'objects']))
      .collect()
      .each(spy);

    expect(spy).toHaveBeenCalledWith([
      { name: 'Joe' },
      { name: 'Wayne' },
      { name: 'Will' }
    ]);
  });
});
