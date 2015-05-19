'use strict';

var gulp   = require('gulp');
var $      = require('gulp-load-plugins')();
var config = require('./appConfig');
var helpers= require('./helpers');


var slack = require('gulp-slack')({
    url: 'https://hooks.slack.com/services/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',
    channel: '#front-dev',
    user: 'Gulp',
    // icon_url: 'http://foo.com/bar.jpg',
    icon_emoji: ':ghost:'
});

gulp.task('deploy-firebase', function() {
  $.run('firebase deploy').exec()
    .pipe(gulp.dest('output'))
    .pipe(slack('Deployed latest build'));
});

gulp.task('deploy-ghp', function() {
  return gulp.src(config.path.dist.root + '**/*')
    .pipe($.plumber({errorHandler: helpers.notifyError}))
    .pipe($.replace('href=/', 'href=/oi/'))
    .pipe($.replace('href="/', 'href="/oi/'))
    .pipe($.replace('src="/', 'src="/oi/'))
    .pipe($.ghPages());
});
