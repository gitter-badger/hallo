'use strict';

var gulp   = require('gulp');
var $      = require('gulp-load-plugins')();
var config = require('./appConfig');
var helpers= require('./helpers');

gulp.task('build-docs', function() {
  var data = helpers.loadData();
  gulp.src(config.path.docs.jade)
    .pipe($.plumber())
    // .pipe($.changed(config.path.docs.jade))
    .pipe($.jade({ locals: data }))
    .pipe($.minifyHtml())
    .pipe(gulp.dest(config.path.docs.root));
});
