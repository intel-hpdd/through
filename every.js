//
// Copyright (c) 2018 DDN. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

'use strict';

/**
 * Determines if every item is truthy in the stream.
 * @param {Highland.Stream} s
 * @returns {Highland.Stream} A stream.
 */
module.exports = function every (s) {
  return s.reduce1(function (a, b) {
    return a && b;
  });
};
