//
// Copyright (c) 2017 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

'use strict';

/**
 * Collects values into an array.
 * This differs from λ.collect in that
 * we don't represent an empty stream as
 * an array. We only push an array with values.
 * @param {Highland.Stream} s
 * @returns {Highland.Stream} A stream.
 */
module.exports = function collectValues (s) {
  var arr = [];

  return s.consume(function collector (err, x, push, next) {
    if (err) {
      push(err);
      next();
    } else if (x === nil) {
      if (arr.length)
        push(null, arr);

      push(null, nil);
    } else {
      arr.push(x);
      next();
    }
  });
};
