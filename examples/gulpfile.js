var gulp = require('gulp');
var prettify = require('../');

// normal usage
gulp.task('normal', function(){
  gulp.src('./index.html')
  .pipe(prettify())
  .pipe(gulp.dest('./build'));
});

// indent code
gulp.task('indent', function(){
  gulp.src('./index.html')
  .pipe(prettify({indent_inner_html: true}))
  .pipe(gulp.dest('./build'));
});

// indent specified tab size
gulp.task('indent:tab:2', function(){
  gulp.src('./index.html')
  .pipe(prettify({indent_size: 2}))
  .pipe(gulp.dest('./build'));
});

// state tags not to format
gulp.task('unformatted:pre', function(){
  gulp.src('./index.html')
  .pipe(prettify({unformatted: ['pre', 'code'] }))
  .pipe(gulp.dest('./build'));
});