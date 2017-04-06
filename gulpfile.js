var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');

var inputSass = './src/scss/**/*.scss';
var outputSass = './src/static/css';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function () {
  return gulp
    .src(inputSass)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(outputSass));
});

gulp.task('compress', function() {
  return gulp.src(['src/components/*.js', 'src/layouts/*.js', 'src/pages/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('src/static/js'));
});

gulp.task('webpack', function() {
  return gulp.src('../src/index.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('./src/static/js'));
});

gulp.task('watch', function() {

  gulp
    .watch(['../src/**/*'], ['webpack'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['webpack', 'watch' /*, possible other tasks... */]);

gulp.task('prod', function () {
  return gulp
    .src(inputSass)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(outputSass));
});


