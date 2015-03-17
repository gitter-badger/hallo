'use strict';

var gulp   = require('gulp');
var $      = require('gulp-load-plugins')();
var config = require('./appConfig');
var helpers= require('./helpers');
var logdown= require('logdown')
var msg    = new logdown({prefix: 'Message:'})


gulp.task('watch', ['build-jade', 'build-stylus', 'build-docs'],  function() {
    gulp.watch(config.path.docs.jade, ['build-docs']);
    gulp.watch(config.path.src.jade, ['build-jade']);
    gulp.watch(config.path.src.stylus, ['build-stylus']);
});

gulp.task('server', ['watch'], function() {
  gulp.src(config.path.dist.root)
    .pipe($.webserver({
      host: config.server.host,
      port: config.server.port,
      livereload: true,
      directoryListing: false,
      open: true,
      fallback: 'index.html'
    }));
});
