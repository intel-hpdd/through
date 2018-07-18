//
// Copyright (c) 2017 DDN. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

'use strict';

var fp = require('intel-fp');

/**
 * Plucks path and then flattens result.
 * @param {Array} path
 * @param {Highland.Stream} s
 * @returns {Highland.Stream} A stream.
 */
module.exports = fp.curry(2, function flatPluckPath (path, s) {
  return s
    .flatMap(fp.pathLens(path));
});
