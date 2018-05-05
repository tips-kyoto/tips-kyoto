var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync').create();
var cleancss     = require('gulp-clean-css');
var concat       = require('gulp-concat');
var gcmq         = require('gulp-group-css-media-queries');
var gulp         = require('gulp');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var pug          = require('gulp-pug');
var rename       = require('gulp-rename');
var runSequence  = require('run-sequence');
var sass         = require('gulp-sass');
var sassGlob     = require('gulp-sass-glob');
var sourcemaps   = require('gulp-sourcemaps');
var stripDebug   = require('gulp-strip-debug');
var uglify       = require('gulp-uglify');

//setting : paths
var paths = {
  'pug'   : 'src/pug/',
  'scss'  : 'src/sass/',
  'jsSrc' : 'src/js/',
  'html'  : 'docs/',
  'css'   : 'docs/css/',
  'js'    : 'docs/js/',
  'image' : 'docs/images/',
};

//setting : Pug Options
var pugOptions = {
  pretty: true,
  basedir: __dirname + '/' + paths.pug
};

//setting : Sass Options
var sassOptions = {
  outputStyle: 'expanded'
};
var cssOptions = {};

// setting : JS
var jsFileName = 'script.js';
var jsOptions = {
  output: {comments: 'some'}
};

// pug
gulp.task('pug', function() {
  return gulp.src([paths.pug + '**/*.pug', '!' + paths.pug + '**/_*.pug'])
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(pug(pugOptions))
    .pipe(gulp.dest(paths.html))
    .pipe(browserSync.stream());
});

// style (sass)
gulp.task('style', function() {
  gulp.src(paths.scss + '**/*.scss')
  .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
  .pipe(sassGlob())
  .pipe(plumber())
  .pipe(sass(sassOptions))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gcmq())
  .pipe(gulp.dest(paths.css))
  .pipe(browserSync.stream());
});

// scripts (js)
gulp.task('scripts', function() {
  return gulp.src(paths.jsSrc + '**/*.js')
    .pipe(concat(jsFileName))
    .pipe(gulp.dest(paths.js))
    .pipe(browserSync.stream());
});

// remove console.log from JS
gulp.task('strip_debug', function () {
  return gulp.src(paths.js + '*.js')
    .pipe(stripDebug())
    .pipe(gulp.dest(paths.js));
});

// minify JS
gulp.task('minify_js', function () {
  return gulp.src(paths.js + '*.js')
    .pipe(uglify(jsOptions))
    .pipe(gulp.dest(paths.js));
});


// minify CSS
gulp.task('minify_css', function () {
  return gulp.src(paths.css + '*.css')
    .pipe(cleancss(cssOptions))
    .pipe(gulp.dest(paths.css));
});


gulp.task('watch', function() {
  browserSync.init({
    server: {
        baseDir: paths.html
    },
    reloadDelay: 150,
    open: false
  });
  gulp.watch(paths.pug + '**/*.pug', ['pug']);
  gulp.watch(paths.scss + '**/*.scss', ['style']);
  gulp.watch(paths.jsSrc + '**/*.js', ['scripts']);
  gulp.watch(paths.image + '**/*.+(jpg|jpeg|png|gif|svg)').on('change', browserSync.reload);
});

gulp.task('default', [
  'pug',
  'style',
  'scripts',
  'watch'
]);

gulp.task('deploy', function (callback) {
  return runSequence(
    ['pug', 'scripts', 'style'],
    'strip_debug',
    'minify_js',
    'minify_css',
    callback
  );
});
