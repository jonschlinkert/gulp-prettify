/*
 * gulp-prettify
 * https://github.com/jonschlinkert/gulp-prettify
 *
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT license.
 */

/* globals describe, it */

'use strict';

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var expect = require('chai').expect;
var prettify = require('../index.js');
var format = require('js-beautify').html;
var es = require('event-stream');


describe('prettify HTML', function () {
  describe('gulp-prettify', function () {

    it('should prettify HTML files', function (done) {
      var filename = path.join(__dirname, './fixtures/index.html');
      gulp.src(filename)
        .pipe(prettify())
        .pipe(es.map(function (file) {
          var expected = format(fs.readFileSync(filename, 'utf-8'));
          expect(String(file.contents)).to.equal(expected);
          done();
        }));
    });

    it('should indent inner HTML', function (done) {
      var filename = path.join(__dirname, './fixtures/index.html');
      gulp.src(filename)
        .pipe(prettify({indent_inner_html: true}))
        .pipe(es.map(function (file) {
          var expected = format(fs.readFileSync(filename, 'utf-8'), {indent_inner_html: true});
          expect(String(file.contents)).to.equal(expected);
          done();
        }));
    });

    it('should indent 4 spaces', function (done) {
      var filename = path.join(__dirname, './fixtures/index.html');
      gulp.src(filename)
        .pipe(prettify({indent_size: 4}))
        .pipe(es.map(function (file) {
          var expected = format(fs.readFileSync(filename, 'utf-8'), {indent_size: 4});
          expect(String(file.contents)).to.equal(expected);
          done();
        }));
    });

    it('should not format pre and code tags', function (done) {
      var filename = path.join(__dirname, './fixtures/index.html');
      gulp.src(filename)
        .pipe(prettify({unformatted: ['pre', 'code'] }))
        .pipe(es.map(function (file) {
          var expected = format(fs.readFileSync(filename, 'utf-8'), {unformatted: ['pre', 'code'] });
          expect(String(file.contents)).to.equal(expected);
          done();
        }));
    });
  });
});