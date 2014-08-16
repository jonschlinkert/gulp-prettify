/*!
 * gulp-prettify <https://github.com/jonschlinkert/gulp-prettify>
 *
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var expect = require('chai').expect;
var prettify = require('../');

var fixtureFile = fs.readFileSync(path.join(__dirname, './fixtures/index.html'));

describe('prettify HTML', function () {
  describe('gulp-prettify', function () {

    it('should prettify HTML files', function (done) {

      var prettyStream = prettify();
      var fakeFile = new gutil.File({
        base: 'test/fixtures',
        cwd: 'test/',
        path: 'test/fixtures/index.html',
        contents: fixtureFile
      });
      prettyStream.once('data', function (newFile) {
        expect(String(newFile.contents)).to.equal(String(fs.readFileSync(path.join(__dirname, './expected/normal.html'))));
        done();
      });
      prettyStream.write(fakeFile);
    });

    it('should indent inner HTML', function (done) {

      var prettyStream = prettify({indent_inner_html: true});
      var fakeFile = new gutil.File({
        base: 'test/fixtures',
        cwd: 'test/',
        path: 'test/fixtures/index.html',
        contents: fixtureFile
      });
      prettyStream.once('data', function(newFile){
          expect(String(newFile.contents)).to.equal(String(fs.readFileSync(path.join(__dirname, './expected/indent.html'))));
          done();
        });
      prettyStream.write(fakeFile);
    });

    it('should indent a specified tab size', function (done) {

      var prettyStream = prettify({indent_size: 2});
      var fakeFile = new gutil.File({
        base: 'test/fixtures',
        cwd: 'test/',
        path: 'test/fixtures/index.html',
        contents: fixtureFile
      });
      prettyStream.once('data', function(newFile){
          expect(String(newFile.contents)).to.equal(String(fs.readFileSync(path.join(__dirname, './expected/indent_tab_2.html'))));
          done();
        });
      prettyStream.write(fakeFile);
    });

    it('should not prettify pre or code tags', function (done) {

      var prettyStream = prettify({unformatted: ['pre', 'code'] });
      var fakeFile = new gutil.File({
        base: 'test/fixtures',
        cwd: 'test/',
        path: 'test/fixtures/index.html',
        contents: fixtureFile
      });
      prettyStream.once('data', function(newFile){
          expect(String(newFile.contents)).to.equal(String(fs.readFileSync(path.join(__dirname, './expected/unformatted_pre.html'))));
          done();
        });
      prettyStream.write(fakeFile);
    });
  });
});