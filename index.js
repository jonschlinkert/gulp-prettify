/*
 * gulp-prettify
 * https://github.com/jonschlinkert/gulp-prettify
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT license.
 */


var Buffer = require('buffer').Buffer;
var es = require('event-stream');
var prettify = require('js-beautify').html;

module.exports = function (opts) {
  'use strict';

  opts = opts || {};

  return es.map(function (file, cb) {
    try {
      file.contents = new Buffer(prettify(String(file.contents), opts));
    } catch (err) {
      console.warn('Error caught from js-beautify: ' + err.message + '.');
    }
    cb(null, file);
  });
};