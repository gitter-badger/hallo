'use strict';

var gulp   = require('gulp');
var $      = require('gulp-load-plugins')();
var config = require('./appConfig');
var psi    = require('psi');

gulp.task('clear', function() {
  return gulp.src(config.path.dist.root, { read: false })
    .pipe($.rimraf());
});


gulp.task('speed', function() {
  psi.output('https://oioi.firebaseapp.com/produtos-e-servicos/',{
    // key: '',
    strategy: 'mobile', // desktop || mobile
    threshold: 100

  }, function (err, data) {
    console.log('done');

  });
});
