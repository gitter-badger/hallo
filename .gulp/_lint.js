'use strict';

var gulp         = require('gulp');
var $            = require('gulp-load-plugins')();
$.mainBowerFiles = require('main-bower-files');
var config       = require('./appConfig');
var helpers      = require('./helpers');
var stylish      = require('jshint-stylish');

var map = require('map-stream');
var events = require('events');
var notify = require('gulp-notify');
var emmitter = new events.EventEmitter();
var path = require('path');

var jsHintErrorReporter = map(function (file, cb) {
  if (!file.jshint.success) {
    file.jshint.results.forEach(function (err) {
      if (err) {
        var msg = [
          path.basename(file.path),
          'Line: ' + err.error.line,
          'Reason: ' + err.error.reason
        ];
        emmitter.emit('error', new Error(msg.join('\n')));
      }
    });
  }
  cb(null, file);
});

gulp.task('lint-scripts', function() {
  gulp.src(config.path.src.scripts)
    .pipe($.plumber({errorHandler: helpers.notifyError}))
    .pipe($.jshint('.jshintrc', {fail: true}))
    .pipe($.jshint.reporter(stylish))
    .pipe(jsHintErrorReporter)
    .on('error', $.notify.onError(function (error) {
      return error.message;
    }));
});

gulp.task('jscs-scripts', function() {
  gulp.src(config.path.src.scripts)
    .pipe($.jscs());
});
