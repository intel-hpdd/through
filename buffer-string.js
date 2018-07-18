//
// Copyright (c) 2017 DDN. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

'use strict';

var collectValues = require('./collect-values');

module.exports = function bufferString (s) {
  return s
    .invoke('toString', ['utf8'])
    .through(collectValues)
    .invoke('join', ['']);
};
