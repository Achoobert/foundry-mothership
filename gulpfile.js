const gulp = require('gulp');
const prefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const dartSass = require('sass');
const gulpSass = require('gulp-sass');
const sass = gulpSass(dartSass);

/* ----------------------------------------- */
/*  Compile Sass
/* ----------------------------------------- */

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

const SYSTEM_SCSS = ['scss/**/*.scss'];

function compileScss() {
  const options = {
    outputStyle: 'expanded'
  };
  return gulp.src(SYSTEM_SCSS)
    .pipe(sourcemaps.init())
    .pipe(
      sass(options).on('error', handleError)
    )
    .pipe(prefix({
      cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'));
}

const css = gulp.series(compileScss);

/* ----------------------------------------- */
/*  Watch Updates
/* ----------------------------------------- */

function watchUpdates() {
  gulp.watch(SYSTEM_SCSS, css);
}

/* ----------------------------------------- */
/*  Export Tasks
/* ----------------------------------------- */

exports.css = css;
exports.build = css;
exports.default = gulp.series(compileScss, watchUpdates);
