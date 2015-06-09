'use strict';

var gulp   = require('gulp');
var $      = require('gulp-load-plugins')();
var config = require('./appConfig');
var helpers= require('./helpers');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var logdown= require('logdown')
var msg    = new logdown({prefix: 'Message:'})
var runSequence  = require('run-sequence');


gulp.task('watch', [],  function() {

    runSequence([
        'build-data',
        'build-api',
        'build-bower',
        'build-scripts',
        'build-templates',
        'build-jade',
        'build-stylus',
        'build-fonts'
    ]);

    gulp.watch(config.path.src.data, ['build-jade', reload]);
    gulp.watch(config.path.src.api, ['build-api', reload]);
    gulp.watch(config.path.src.tags, ['build-templates', reload]);
    gulp.watch(config.path.src.tagsJade, ['build-templates-jade', reload]);
    gulp.watch(config.path.src.scripts, ['build-scripts', reload]);
    gulp.watch(config.path.src.jade, ['build-jade', reload]);
    gulp.watch(config.path.src.stylus, ['build-stylus', reload]);
    gulp.watch(config.path.src.fonts, ['build-fonts', reload]);
    gulp.watch(config.path.src.images, ['build-images', reload]);
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

gulp.task('reset', [], function(){
  runSequence([
      'clear',
      'build'
  ]);
});
