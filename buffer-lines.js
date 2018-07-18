//
// Copyright (c) 2017 DDN. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

'use strict';

var bufferString = require('./buffer-string');

module.exports = function bufferLines (s) {
  return s
    .through(bufferString)
    .split();
};
