'use strict';

var gulp   = require('gulp');
var $      = require('gulp-load-plugins')();
var config = require('./appConfig');
var helpers= require('./helpers');
var logdown= require('logdown')
var msg    = new logdown({prefix: 'Message:'})
var jeet         = require('jeet');
var koutoSwiss   = require('kouto-swiss');
var rupture      = require('rupture');

gulp.task('build-jade', function() {
  var data = helpers.loadData();
  gulp.src(config.path.src.jade)
    .pipe($.plumber())
    .pipe($.changed(config.path.dist.root))
    .pipe($.filter(helpers.filterPartials))
    .pipe($.jade({ locals: data }))
    .pipe($.minifyHtml())
    .pipe($.if(config.isProd, $.gzip()))
    .pipe(gulp.dest(config.path.dist.root));
});

gulp.task('build-stylus', function () {
  gulp.src(config.path.src.stylus)
    .pipe($.plumber())
    // .pipe($.changed(config.path.src.stylus))
    .pipe($.filter(helpers.filterPartials))
    .pipe($.if(!config.isProd, $.sourcemaps.init() ))
    .pipe($.stylus({
      use: [jeet(), koutoSwiss(), rupture()]
    }))
    .pipe($.combineMediaQueries())
    .pipe($.autoprefixer({
      browsers: config.BrowserList,
      cascade: false
    }))
    .pipe($.if(!config.isProd, $.sourcemaps.write('.')))
    .pipe(gulp.dest(config.path.dist.css));
});


gulp.task('build', ['build-jade', 'build-stylus' ], function() {
  msg.log('`All Build!`')
});
