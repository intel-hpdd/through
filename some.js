//
// Copyright (c) 2017 DDN. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

'use strict';

/**
 * Determines if any items are truthy in the stream.
 * @param {Highland.Stream} s
 * @returns {Highland.Stream} A stream.
 */
module.exports = function some (s) {
  return s.reduce1(function aOrB (a, b) {
    return a || b;
  });
};
