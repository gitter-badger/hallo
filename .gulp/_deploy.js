'use strict';

var gulp   = require('gulp');
var $      = require('gulp-load-plugins')();
var config = require('./appConfig');
var helpers= require('./helpers');

gulp.task('deploy-ghp', function() {
  return gulp.src(config.path.dist.root + '**/*')
    .pipe($.plumber({errorHandler: helpers.notifyError}))
    .pipe($.replace('href=/', 'href=/oi/'))
    .pipe($.replace('href="/', 'href="/oi/'))
    .pipe($.replace('src="/', 'src="/oi/'))
    .pipe($.ghPages());
});
