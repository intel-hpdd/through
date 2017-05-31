//
// Copyright (c) 2017 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

'use strict';

var fp = require('intel-fp');
var obj = require('intel-obj');

/**
 * Plucks the array of values out
 * of each object in the stream.
 */
module.exports = fp.curry(2, function pluckValues (arr, s) {
  return s
    .pick(arr)
    .map(obj.values);
});
