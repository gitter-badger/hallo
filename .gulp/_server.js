'use strict';

var gulp   = require('gulp');
var $      = require('gulp-load-plugins')();
var config = require('./appConfig');
var helpers= require('./helpers');
var browserSync = require('browser-sync');
var logdown= require('logdown')
var msg    = new logdown({prefix: 'Message:'})


gulp.task('watch', ['build-jade', 'build-stylus', 'build-docs'],  function() {
    gulp.watch(config.path.docs.jade, ['build-docs']);
    gulp.watch(config.path.src.jade, ['build-jade']);
    gulp.watch(config.path.src.stylus, ['build-stylus']);
});

gulp.task('server', ['watch'], function() {
  browserSync({
    server: {
      baseDir: config.path.dist.root,
      // port: config.server.port,
      port: 8090,
      https: false,
      ghostMode: {
        clicks: false,
        forms : false,
        scroll: false
      },
      // browser: ["google chrome", "firefox"],
      injectChanges: true,
      // logConnections: false,
      // logFileChanges: true,
      logLevel: 'info', // debug | info | silent
      logPrefix: 'browserSync',
      notify: false,
      // online: true,
      open: true,
      // reloadDelay: 500
      // reloadOnRestart: true
      // xip: true
    }
  });
});
