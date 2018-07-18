//
// Copyright (c) 2018 DDN. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

'use strict';

var fp = require('intel-fp');

/**
 * Sorts the stream by the comparator
 * @param {Function} cmp
 * @param {Highland.Stream} s
 * @returns {Highland.Stream} A stream.
 */
module.exports = fp.curry(2, function sortBy (cmp, s) {
  return s.collect()
    .invoke('sort', [cmp])
    .sequence();
});
