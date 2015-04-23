'use strict';

var gulp         = require('gulp');
var $            = require('gulp-load-plugins')();
$.mainBowerFiles = require('main-bower-files');
var config       = require('./appConfig');
var helpers      = require('./helpers');
var jeet         = require('jeet');
var koutoSwiss   = require('kouto-swiss');
var rupture      = require('rupture');
var runSequence  = require('run-sequence');
var pkg          = require('../package.json');
var Logdown      = require('logdown');
var logger       = new Logdown({prefix: 'GULP build'});

var data;

gulp.task('build-data', function() {
  data = helpers.loadData();
});

gulp.task('build-sprites', function() {
    var spriteData =
        gulp.src('./app/assets/images/logos/120x40/*.png')
          .pipe($.plumber({errorHandler: helpers.notifyError}))
          .pipe($.spritesmith({
              imgName: 'sprite-logos.png',
              cssName: '_sprite-logos.styl',
              cssFormat: 'stylus',
              algorithm: 'top-down',//top-down, left-right, diagonal, alt-diagonal,  binary-tree
              cssTemplate: '.gulp/stylus.template.mustache',
              cssVarMap: function(sprite) {
                  sprite.name = 's-' + sprite.name;
              }
          }));

    spriteData.img.pipe(gulp.dest('./dist/assets/images/'));
    spriteData.css.pipe(gulp.dest('./app/assets/styles/components/'));
});

gulp.task('build-jade',['build-data'], function() {
  gulp.src(config.path.src.jade)
    .pipe($.plumber({errorHandler: helpers.notifyError}))
    .pipe($.changed(config.path.dist.root))
    .pipe($.filter(helpers.filterPartials))
    .pipe($.jade({
      locals: data,
      pretty: true
    }))
    .pipe($.uglifyInline({
      mangle: true
    }))
    // .pipe($.if(config.isProd, $.minifyHtml()))
    .pipe(gulp.dest(config.path.dist.root))
    .pipe($.if(config.isProd, $.gzip()))
    .pipe(gulp.dest(config.path.dist.root));
});

gulp.task('build-fonts', function() {
  gulp.src(config.path.src.fonts)
    .pipe($.plumber({errorHandler: helpers.notifyError}))
    .pipe($.changed(config.path.src.fonts))
    .pipe(gulp.dest(config.path.dist.fonts));
});

gulp.task('build-font-icon', function() {
  var fontName = 'oi-icons';
  gulp.src(config.path.src.icons)
    .pipe($.plumber({errorHandler: helpers.notifyError}))
    .pipe($.changed(config.path.src.icons))

    .pipe($.iconfontCss({
        fontName: fontName,
        // path: './app/assets/styles/components/_icons.styl',
        targetPath: '../../../app/assets/styles/components/_icon-font.styl',
        fontPath: '../fonts/'
    }))
    .pipe($.iconfont({
      fontName: fontName,
      fixedWidth: true,
        centerHorizontally: true,
        normalize: true,
        // fontHeight
        // round: 1
        // descent: 0
      // log: [Function],

      // appendCodepoints: true,
      // error: [Function],
      // ignoreExt: false,
    }))
    .on('codepoints', function(codepoints, options) {
      console.log(codepoints, options);
    })
    .pipe(gulp.dest(config.path.dist.fonts));
});

gulp.task('build-images', function() {
  return gulp.src(config.path.src.images)
    .pipe($.plumber({errorHandler: helpers.notifyError}))
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
    .pipe($.plumber({errorHandler: helpers.notifyError}))
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
    .pipe($.minifyCss())
    .pipe($.csso())
    .pipe($.if(!config.isProd, $.sourcemaps.write('.')))
    .pipe(gulp.dest(config.path.dist.css))
    .pipe($.if(config.isProd, $.gzip()))
    .pipe(gulp.dest(config.path.dist.css));
});

gulp.task('build-bower', function() {
  var filterRequire = $.filter('require.js');
  var filterJs = $.filter(['*.js', '!require.js']);
  var filterCss = $.filter('*.css');

  return gulp.src($.mainBowerFiles())
    .pipe($.plumber({errorHandler: helpers.notifyError}))

    .pipe(filterRequire)
    .pipe(((!config.isProd) ? $.uglify({
      mangle: false
    }) : $.util.noop()))
    .pipe(gulp.dest(config.path.dist.scripts + 'vendor'))
    .pipe($.gzip())
    .pipe(gulp.dest(config.path.dist.scripts + 'vendor'))
    .pipe(filterRequire.restore())

    .pipe(filterJs)
    // .pipe($.concat('vendor' + pkg.version + '.js'))
    // .pipe($.concat('vendor.js'))
    .pipe(((!config.isProd) ? $.uglify({
      mangle: false
    }) : $.util.noop()))
    .pipe(gulp.dest(config.path.dist.scripts + 'vendor'))
    .pipe($.gzip())
    .pipe(gulp.dest(config.path.dist.scripts + 'vendor'))
    .pipe(filterJs.restore())

    .pipe(filterCss)
      // .pipe($.concat('vendor' + pkg.version + '.css'))
      .pipe($.concat('vendor.css'))
      .pipe($.csso())
      .pipe(gulp.dest(config.path.dist.css))
      .pipe($.gzip())
      .pipe(gulp.dest(config.path.dist.css));
});

gulp.task('build-manifest', function(){
  gulp.src([ config.path.dist.root + '**/*'])
    .pipe($.plumber({errorHandler: helpers.notifyError}))
    .pipe($.manifest({
      hash: true,
      preferOnline: true,
      network: ['http://*', 'https://*', '*'],
      filename: 'app.manifest',
      exclude: 'app.manifest'
     }))
    .pipe(gulp.dest(config.path.dist.root));
});

gulp.task('build-scripts', function(){
  gulp.src(config.path.src.scripts)
    .pipe($.plumber({errorHandler: helpers.notifyError}))
    .pipe($.changed(config.path.dist.scripts))
    .pipe($.filter(helpers.filterPartials))
    // .pipe($.concat('main-' + pkg.version + '.js'))
    .pipe($.uglify({
      mangle: false
    }))
    .pipe(gulp.dest(config.path.dist.scripts))
    .pipe($.gzip())
    .pipe(gulp.dest(config.path.dist.scripts));
});

gulp.task('build-templates', function(){
  gulp.src(config.path.src.tags)
    .pipe($.plumber({errorHandler: helpers.notifyError}))
    .pipe($.changed(config.path.dist.tags))
    .pipe($.flatten())
    .pipe($.riot({
      compact: true,
      template: 'jade'
    }))
    .pipe(gulp.dest(config.path.dist.tags))
    .pipe($.gzip())
    .pipe(gulp.dest(config.path.dist.tags))
});


gulp.task('build', function() {
  runSequence(
    'build-data',
    'build-bower',
    'build-templates',
    'build-scripts',
    'build-jade',
    'build-stylus',
    'build-images',
    'build-fonts',
    'build-manifest'
    );
  // msg.log('`All Build!`');
});
