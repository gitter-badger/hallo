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

$.mainBowerFiles = require('main-bower-files');

var data = helpers.loadData();

gulp.task('build-jade', function() {
  gulp.src(config.path.src.jade)
    .pipe($.plumber())
    .pipe($.changed(config.path.dist.root))
    .pipe($.filter(helpers.filterPartials))
    .pipe($.jade({
      locals: data,
      pretty: true
    }))
    .pipe($.if(config.isProd, $.minifyHtml()))
    .pipe($.if(config.isProd, $.gzip()))
    .pipe(gulp.dest(config.path.dist.root));
});

gulp.task('build-fonts', function() {
  gulp.src(config.path.src.fonts)
    .pipe($.plumber())
    .pipe($.changed(config.path.src.fonts))
    .pipe(gulp.dest(config.path.dist.fonts));
});

gulp.task('build-fonts-icon', function() {
  var fontName = 'oi-icons';
  gulp.src(config.path.src.icons)
    .pipe($.plumber())
    .pipe($.changed(config.path.src.icons))

    .pipe($.iconfontCss({
        fontName: fontName,
        // path: './app/assets/styles/components/_icons.styl',
        targetPath: '../../../app/assets/styles/components/_icon-font.styl',
        fontPath: '../fonts/'
    }))
    .pipe($.iconfont({
      appendCodepoints: true,
      descent: 0,
      // error: [Function],
      fixedWidth: true,
      fontName: fontName,
      ignoreExt: false,
      // log: [Function],
      round: 10000000000000
    }))
    .on('codepoints', function(codepoints, options) {
      console.log(codepoints, options);
    })
    .pipe(gulp.dest(config.path.dist.fonts));
});

gulp.task("build-bower", function(){
    return gulp.src(
      $.mainBowerFiles(), {base: config.path.src.bower } )
      .pipe(gulp.dest(config.path.dist.scripts));
});

gulp.task('build-images', function() {
  return gulp.src(config.path.src.images)
    .pipe($.newer(config.path.dist.images))
    // .pipe($.imagemin({
    //   optimizationLevel: 3,
    //   progressive: true,
    //   interlaced: true
    // }))
    .pipe(gulp.dest(config.path.dist.images));
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
    .pipe($.csso())
    .pipe($.if(!config.isProd, $.sourcemaps.write('.')))
    .pipe(gulp.dest(config.path.dist.css));
});

gulp.task('build-manifest', function(){
  gulp.src([ config.path.dist.root + '**/*'])
    .pipe($.plumber())
    .pipe($.manifest({
      hash: true,
      preferOnline: true,
      network: ['http://*', 'https://*', '*'],
      filename: 'app.manifest',
      exclude: 'app.manifest'
     }))
    .pipe(gulp.dest(config.path.dist.root));
});

gulp.task('build', ['build-jade', 'build-fonts', 'build-stylus', 'build-images', 'build-manifest' ], function() {
  msg.log('`All Build!`')
});
