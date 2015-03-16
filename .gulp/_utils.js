'use strict';

var gulp   = require('gulp');
var $      = require('gulp-load-plugins')();
var config = require('./appConfig');

gulp.task('clear', function() {
  return gulp.src(config.path.dist.root, { read: false })
    .pipe($.rimraf());
});
