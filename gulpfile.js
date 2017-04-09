let gulp = require('gulp');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let autoprefixer = require('gulp-autoprefixer');
let uglify = require('gulp-uglify');
let webpackStream = require('webpack-stream');
let webpack2 = require('webpack'); // Compiles JavaScript
let nodemon = require('gulp-nodemon'); // Updates server on change
let Cache = require('gulp-file-cache');
let notify = require('gulp-notify');

let fileCache = new Cache();

let webpackConfig = require('./webpack.config.js');

let inputSass = './src/scss/**/*.scss';
let outputSass = './src/static/css';

let sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
};

let autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR'],
};

gulp.task('sass', function() {
  return gulp
    .src(inputSass)
    .pipe(fileCache.filter())
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(outputSass))
    .pipe(fileCache.cache())
    .pipe(notify('Sass finished'));
});

gulp.task('compress', function() {
  return gulp.src(['src/components/*.js', 'src/layouts/*.js', 'src/pages/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('src/static/js'));
});

gulp.task('webpack', function() {
  return gulp.src('./src/app-client.js')
    .pipe(fileCache.filter())
    .pipe(webpackStream(webpackConfig, webpack2))
    .on('error', function handleError() {
      notify.onError(function(error) {
        return 'Error: ' + error.message;
      });
      this.emit('end'); // Recover from errors
    })
    .pipe(gulp.dest('./src/static/js'))
    .pipe(fileCache.cache())
    .pipe(notify('Webpack finished'));
});

gulp.task('server', function() {
  let stream = nodemon({
    script: 'src/server.js',
    ignore: ['src/static/*'],
    ext: 'ejs js jsx',
    env: { 'NODE_ENV': 'development' },
  });

  stream
    .on('restart', function() {
      console.log('restarted!');
      notify('Server restarted');
    })
    .on('crash', function() {
      console.error('Application has crashed!\n');
      notify('Application has crashed');
      stream.emit('restart', 10);  // restart the server in 10 seconds
    });
});

gulp.task('watch', function() {
  gulp.watch(['./src/!(static)/**/*.jsx', './src/!(static)/**/*.js'], gulp.series('webpack'));
  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.parallel('server', gulp.series('sass', 'webpack', 'watch')));

gulp.task('prod', function() {
  return gulp
    .src(inputSass)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(outputSass));
});


