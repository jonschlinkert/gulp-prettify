# gulp-prettify
[![Build Status](https://travis-ci.org/jonschlinkert/gulp-prettify.png?branch=master)](https://travis-ci.org/jonschlinkert/gulp-prettify)
[![NPM version](https://badge.fury.io/js/gulp-prettify.png)](http://badge.fury.io/js/gulp-prettify)

> Prettify HTML.

## Getting Started
Install the module with: `npm install gulp-prettify`

## Usage

```js
var gulp = require('gulp');
var prettify = require('gulp-prettify');

gulp.task('prettify', function() {
  gulp.src('src/*.html')
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest('dist'))
});
```
Other examples are in the [example folder.](http://github.com/jonschlinkert/gulp-prettify/tree/master/examples)

See the [js-beautify docs](https://github.com/einars/js-beautify) for options.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.

## Author

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License
Copyright (c) 2014 Jon Schlinkert
Licensed under the MIT license.
