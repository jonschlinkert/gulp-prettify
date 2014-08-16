/*!
 * gulp-prettify <https://github.com/jonschlinkert/gulp-prettify>
 *
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

var through = require('through2');
var prettify = require('js-beautify').html;
var gutil = require('gulp-util');
var _ = require('lodash');

module.exports = function (options) {
  options = options || {};

  return through.obj(function (file, encoding, callback) {
    try {

      var str = file.contents.toString(encoding || 'utf8');

      file.contents = new Buffer(prettify(str, _.extend({
        indent_handlebars: true,
        indent_inner_html: true,
        preserve_newlines: false,
        max_preserve_newlines: 1,
        brace_style: 'expand',
        indent_char: ' ',
        indent_size: 2,
      }, options)));

    } catch (err) {
      return callback(new gutil.PluginError('gulp-prettify', err, options));
    }

    callback(null, file);
  });
};