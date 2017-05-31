//
// Copyright (c) 2017 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

'use strict';

var isEqual = require('lodash.isequal');

module.exports = function unchangedFilter (s) {
  var cached;

  return s.filter(function filterUnchanged (x) {
    var changed = !isEqual(x, cached);

    cached = x;

    return changed;
  });
};
