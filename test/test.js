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

var fixtureFile = fs.readFileSync(path.join(__dirname, 'fixtures/index.html'));

describe('prettify HTML', function() {
  describe('gulp-prettify', function() {

    it('should prettify HTML files', function(cb) {
      var stream = prettify();
      var fixture = new gutil.File({
        base: 'test/fixtures',
        cwd: 'test/',
        path: 'test/fixtures/index.html',
        contents: fixtureFile
      });
      stream.once('data', function(file) {
        assert.equal(String(file.contents), String(fs.readFileSync(path.join(__dirname, 'expected/normal.html'))));
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
        contents: fixtureFile
      });

      stream.once('data', function(file) {
        assert.equal(String(file.contents), String(fs.readFileSync(path.join(__dirname, 'expected/indent.html'))));
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
        contents: fixtureFile
      });

      stream.once('data', function(file) {
        assert.equal(String(file.contents), String(fs.readFileSync(path.join(__dirname, 'expected/indent_tab_2.html'))));
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
        contents: fixtureFile
      });

      stream.once('data', function(file) {
        assert.equal(String(file.contents), String(fs.readFileSync(path.join(__dirname, 'expected/unformatted_pre.html'))));
        cb();
      });

      stream.write(fixture);
    });
  });
});
