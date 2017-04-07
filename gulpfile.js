var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');
var nodemon = require('gulp-nodemon');
var Cache = require('gulp-file-cache');

var cache = new Cache();

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
  return gulp.src('./src/app-client.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('./src/static/js'));
});

gulp.task('server', function () {
  var stream = nodemon({ 
      script: 'src/server.js', 
      ignore: [],
      ext: 'ejs', 
      env: { 'NODE_ENV': 'development' }
    })

    stream
      .on('restart', function () {
        console.log('restarted!')
      })
      .on('crash', function() {
        console.error('Application has crashed!\n')
         stream.emit('restart', 10)  // restart the server in 10 seconds
      })
})

gulp.task('watch', function() {
    gulp.watch(['./src/!(static)/**/*.jsx', './src/!(static)/**/*.js'], gulp.series('webpack'));
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.parallel('server', gulp.series('sass', 'webpack', 'watch')));

gulp.task('prod', function () {
  return gulp
    .src(inputSass)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(outputSass));
});


