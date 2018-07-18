//
// Copyright (c) 2018 DDN. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

'use strict';

var fp = require('intel-fp');

/**
 * Maps values, then collects the results.
 * @param {Function} fn
 * @param {Highland.Stream} s
 * @returns {Highland.Stream} A stream.
 */
module.exports = fp.curry(2, function collectMap (fn, s) {
  return s.map(fn).collect();
});
