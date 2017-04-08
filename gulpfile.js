let gulp = require('gulp');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let autoprefixer = require('gulp-autoprefixer');
let uglify = require('gulp-uglify');
let webpack = require('webpack-stream');
let nodemon = require('gulp-nodemon');
let Cache = require('gulp-file-cache');

let cache = new Cache();

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
  return gulp.src('./src/app-client.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(gulp.dest('./src/static/js'));
});

gulp.task('server', function() {
  let stream = nodemon({
      script: 'src/server.js',
      ignore: ['src/static/*'],
      ext: 'ejs js jsx',
      env: {'NODE_ENV': 'development'},
    });

    stream
      .on('restart', function() {
        console.log('restarted!');
      })
      .on('crash', function() {
        console.error('Application has crashed!\n');
         stream.emit('restart', 10);  // restart the server in 10 seconds
      });
});

gulp.task('watch', function() {
    gulp.watch(['./src/!(static)/**/*.jsx', './src/!(static)/**/*!(server).js'], gulp.series('webpack'));
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.parallel('server', gulp.series('sass', 'webpack', 'watch')));

gulp.task('prod', function() {
  return gulp
    .src(inputSass)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(outputSass));
});


