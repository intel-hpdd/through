//
// Copyright (c) 2017 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

'use strict';

var fp = require('intel-fp');

/**
 * Collects values in the stream
 * and makes them in an object to the
 * provided keys.
 * @param {Array} keys
 * @param {Highland.Stream} s
 * @returns {Highland.Stream} A stream.
 */
module.exports = fp.curry(2, function zipObject (keys, s) {
  return s
    .collect()
    .map(fp.zipObject(keys));
});
