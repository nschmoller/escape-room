const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const livereload = require('gulp-livereload');
const path = require('../package.json').paths;
const mergeMQ = require('gulp-merge-media-queries');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const gulpif = require('gulp-if');

const isDevelopment = process.env.ENVIRONMENT === 'development';

const settings = {
  src: path.src.scss + 'screen.scss',
  module: {
    autoprefixer: {
      browsers: ['> 1%'],
      cascade: false,
    },
    mmq: { log: true },
  },
};

const onError = () => {
  return notify.onError((error) => {
    return 'Something happend: ' + error.message;
  });
};

const sassTask = () => {
  return gulp.src(settings.src)
    .pipe(sourcemaps.init())
      .pipe(sass())
        .on('error', onError())
      .pipe(autoprefixer(settings.module.autoprefixer))

      // if not development
      .pipe(gulpif(!isDevelopment, cssnano()))
      .pipe(gulpif(!isDevelopment, mergeMQ(settings.module.mmq)))

      .pipe(gulp.dest(path.dist.css))
    .pipe(sourcemaps.write('../maps'))
    .pipe(livereload());
};

module.exports = sassTask;
