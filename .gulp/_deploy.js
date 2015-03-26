'use strict';

var gulp   = require('gulp');
var $      = require('gulp-load-plugins')();
var config = require('./appConfig');
var helpers= require('./helpers');

gulp.task('deploy-ghp', function() {
  return gulp.src(config.path.dist.root + '**/*')
    .pipe($.replace('href=/', 'href=/oi/'))
    .pipe($.ghPages());
});
