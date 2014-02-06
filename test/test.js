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
var gutil = require('gulp-util');
var expect = require('chai').expect;
var prettify = require('../index.js');
var format = require('js-beautify').html;
var es = require('event-stream');

var expectedFilename = path.join(__dirname, './fixtures/index.html');
var actualFilename = path.join(__dirname, './actual/index.html');

var src = path.join(__dirname, './fixtures/*.html');
var dest = path.join(__dirname, './actual');

describe('prettify HTML', function () {
  describe('gulp-prettify', function () {

    it('should prettify HTML files', function (done) {
      gulp.src(src)
        .pipe(prettify())
        .pipe(gulp.dest(dest))
        .pipe(es.map(function (file) {
          var expected = format(fs.readFileSync(expectedFilename, 'utf-8'));
          var actual = fs.readFileSync(actualFilename, 'utf-8');
          expect(actual).to.equal(expected);
          done();
        }));
    });

    it('should indent inner HTML', function (done) {
      gulp.src(src)
        .pipe(prettify({indent_inner_html: true}))
        .pipe(gulp.dest(dest))
        .pipe(es.map(function (file) {
          var expected = format(fs.readFileSync(expectedFilename, 'utf-8'), {indent_inner_html: true});
          var actual = fs.readFileSync(actualFilename, 'utf-8');
          expect(actual).to.equal(expected);
          done();
        }));
    });

    it('should indent 4 spaces', function (done) {
      gulp.src(src)
        .pipe(prettify({indent_size: 4}))
        .pipe(gulp.dest(dest))
        .pipe(es.map(function (file) {
          var expected = format(fs.readFileSync(expectedFilename, 'utf-8'), {indent_size: 4});
          var actual = fs.readFileSync(actualFilename, 'utf-8');
          expect(actual).to.equal(expected);
          done();
        }));
    });

    it('should not format pre and code tags', function (done) {
      gulp.src(src)
        .pipe(prettify({unformatted: ['pre', 'code'] }))
        .pipe(gulp.dest(dest))
        .pipe(es.map(function (file) {
          var expected = format(fs.readFileSync(expectedFilename, 'utf-8'), {unformatted: ['pre', 'code'] });
          var actual = fs.readFileSync(actualFilename, 'utf-8');
          expect(actual).to.equal(expected);
          done();
        }));
    });
  });
});