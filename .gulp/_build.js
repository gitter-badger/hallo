'use strict';

var gulp   = require('gulp');
var $      = require('gulp-load-plugins')();
var config = require('./appConfig');
var helpers= require('./helpers');

gulp.task('build-jade', function() {
  var data = helpers.loadData();
  gulp.src([config.path.src.jade, '!' + config.path.src.partials ])
    .pipe($.plumber())
    .pipe($.changed(config.path.dist.root))
    .pipe($.jade({ locals: data }))
    .pipe($.minifyHtml())
    .pipe($.if(config.isProd, $.gzip()))
    .pipe(gulp.dest(config.path.dist.root));
});

