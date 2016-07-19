var gulp = require('gulp');
var concat = require('gulp-concat');
var annotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var babel = require('gulp-babel');


var paths = {
  jsSource: ['Public/app/**/*.js', '!/Public/bundle.js'],
  sassSource: ['Public/styles/**/*.sass', 'Public/styles/**/*.scss']
};

gulp.task('js', function(){
  return gulp.src(paths.jsSource)
  .pipe(babel())
  .pipe(concat('bundle.js'))
  .pipe(annotate())
  .pipe(gulp.dest('./Public'));
});

gulp.task('sass', function(){
  return gulp.src(paths.sassSource)
  .pipe(sass())
  .pipe(concat('style.css'))
  .pipe(gulp.dest('./Public'));
});

//Watch Tasks
gulp.task('watch', function(){
  gulp.watch(paths.jsSource, ['js']);
  gulp.watch(paths.sassSource, ['sass']);
});

// Run default task
gulp.task('default', ['watch', 'js', 'sass']);
