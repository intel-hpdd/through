//
// Copyright (c) 2018 DDN. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

'use strict';

var fp = require('intel-fp');

/**
 * Determines if any items are truthy in the stream.
 * @param {Number} ms
 * @param {Highland.Stream} s
 * @returns {Highland.Stream} A stream.
 */
module.exports = fp.curry(2, function limit (ms, s) {
  var underLimit = true;

  return s.consume(function (err, x, push, next) {
    if (err)
      pushNext(err, x);
    if (x === nil)
      push(null, nil);
    else
      pushNext(err, x);

    /**
     * Push token downstream and call next.
     * If we haven't ratelimited previously then push
     * immediately and call next.
     * Otherwise push and call next after limit ms.
     * @param {Error} err
     * @param {*} x
     */
    function pushNext (err, x) {
      if (underLimit) {
        underLimit = false;
        push(err, x);
        next();
      } else {
        setTimeout(function () {
          push(err, x);
          next();
        }, ms);
      }
    }
  });
});
