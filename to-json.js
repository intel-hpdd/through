//
// Copyright (c) 2017 DDN. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

'use strict';

var format = require('util').format;

module.exports = function toJson (s) {
  return s
    .map(function convert (x) {
      try {
        return JSON.parse(x);
      } catch (e) {
        throw new Error(format('Could not parse %s to JSON.', x));
      }
    });
};
