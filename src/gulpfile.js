const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
  styles: {
    src: 'scss/**/*.scss',
    dest: '../assets/',
  },
  scripts: {
    src: 'js/**/*.js',
    dest: '../assets/',
  },
};

function styles() {
  return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.styles.dest));
}

function scripts() {
  return src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.scripts.dest));
}

function watchFiles() {
  watch(paths.styles.src, styles);
  watch(paths.scripts.src, scripts);
}

exports.build = series(styles, scripts);

exports.default = series(styles, scripts, watchFiles);
