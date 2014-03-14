/*
 * gulp-prettify
 * https://github.com/jonschlinkert/gulp-prettify
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT license.
 */


var es = require('event-stream');
var prettify = require('js-beautify').html;
var gutil = require('gulp-util');

module.exports = function (opts) {
  'use strict';

  opts = opts || {
    showStack: false
  };

  return es.map(function (file, cb) {
    try {
      file.contents = new Buffer(prettify(String(file.contents), opts));
    } catch (err) {
      return cb(new gutil.PluginError('gulp-prettify', err, opts));
    }
    cb(null, file);
  });
};