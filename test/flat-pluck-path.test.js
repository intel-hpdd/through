// @flow

import highland from 'highland';
import flatPluckPath from '../source/flat-pluck-path.js';

import { describe, beforeEach, it, jasmine, expect } from './jasmine.js';

describe('flat pluck path', function() {
  let spy;
  beforeEach(function() {
    spy = jasmine.createSpy('spy');
  });

  it('should pluck the path', function() {
    highland([
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
