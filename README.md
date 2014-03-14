# gulp-prettify [![NPM version](https://badge.fury.io/js/gulp-prettify.png)](http://badge.fury.io/js/gulp-prettify)

> Prettify HTML.

## Getting Started
Install the module with: `npm install gulp-prettify`

## Usage

```js
var gulp = require('gulp');
var prettify = require('gulp-prettify');

gulp.task('prettify', function() {
  gulp.src('./src/foo.html')
    .pipe(prettify({indentSize: 2}))
    .pipe(gulp.folder('./dist/foo.html'))
});
```

See the [js-beautify docs](https://github.com/einars/js-beautify) for options.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.

## Author

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License
Copyright (c) 2014 Jon Schlinkert
Licensed under the MIT license.
