/*!
 * gulp-prettify <https://github.com/jonschlinkert/gulp-prettify>
 *
 * Copyright (c) 2014-2015 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

var through = require('through2');
var extend = require('extend-shallow');
var prettify = require('js-beautify').html;

module.exports = function(options) {
  var opts = extend({}, options);

  return through.obj(function(file, enc, next) {
    if (file.isNull()) {
      next();
      return;
    }

    try {
      var str = file.contents.toString();
      file.contents = new Buffer(prettify(str, extend({
        indent_handlebars: true,
        indent_inner_html: true,
        preserve_newlines: false,
        max_preserve_newlines: 1,
        brace_style: 'expand',
        indent_char: ' ',
        indent_size: 2
      }, opts)));

    } catch (err) {
      next(err);
      return;
    }

    next(null, file);
  });
};
