/*!
 * gulp-prettify <https://github.com/jonschlinkert/gulp-prettify>
 *
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var gutil = require('gulp-util');
var prettify = require('..');

function read(filepath) {
  return fs.readFileSync(filepath);
}
function expected(filename) {
  return read(path.resolve(__dirname, 'expected', filename)).toString();
}
function fixtures(filename) {
  return read(path.resolve(__dirname, 'fixtures', filename));
}

describe('gulp-prettify', function() {
  it('should prettify HTML files', function(cb) {
    var stream = prettify();
    var fixture = new gutil.File({
      base: 'test/fixtures',
      cwd: 'test/',
      path: 'test/fixtures/index.html',
      contents: fixtures('index.html')
    });

    stream.once('data', function(file) {
      assert.equal(file.contents.toString(), expected('normal.html'));
      cb();
    });
    stream.write(fixture);
  });

  it('should indent inner HTML', function(cb) {
    var stream = prettify({
      indent_inner_html: true
    });

    var fixture = new gutil.File({
      base: 'test/fixtures',
      cwd: 'test/',
      path: 'test/fixtures/index.html',
      contents: fixtures('index.html')
    });

    stream.once('data', function(file) {
      assert.equal(file.contents.toString(), expected('indent.html'));
      cb();
    });
    stream.write(fixture);
  });

  it('should indent a specified tab size', function(cb) {
    var stream = prettify({
      indent_size: 2
    });

    var fixture = new gutil.File({
      base: 'test/fixtures',
      cwd: 'test/',
      path: 'test/fixtures/index.html',
      contents: fixtures('index.html')
    });

    stream.once('data', function(file) {
      assert.equal(file.contents.toString(), expected('indent_tab_2.html'));
      cb();
    });
    stream.write(fixture);
  });

  it('should not prettify pre or code tags', function(cb) {
    var stream = prettify({
      unformatted: ['pre', 'code']
    });

    var fixture = new gutil.File({
      base: 'test/fixtures',
      cwd: 'test/',
      path: 'test/fixtures/index.html',
      contents: fixtures('index.html')
    });

    stream.once('data', function(file) {
      assert.equal(file.contents.toString(), expected('unformatted_pre.html'));
      cb();
    });

    stream.write(fixture);
  });
});
