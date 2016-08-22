(()=>{
  'use strict';
  const gulp = require('gulp'),
        gutil = require('gulp-util'),
        inject = require('gulp-inject'),
        ngfilesort = require('gulp-angular-filesort'),
        environments = require('gulp-environments'),
        transform = require('gulp-transform'),
        concat = require('gulp-concat'),
        rename = require('gulp-rename'),
        uglify = require('gulp-uglify'),
        ngmin = require('gulp-ngmin'),
        ngAnnotate = require('gulp-ng-annotate'),
        del = require('del');

  gulp.task('clean', ['production'], ()=>{
      return del(["./public/build"]);
  });

  gulp.task('production', ()=>{
      return gulp.src(['./public/app/**/**/*.module.js', 
                    './public/app/**/**/*.controller.js', 
                    './public/app/**/**/*.service.js'])
              .pipe(concat('./public/build/concat.js'))
              .pipe(ngmin())
              .pipe(gulp.dest('./public/build'))
              .pipe(rename('./src.js'))
              .pipe(ngAnnotate())
              .pipe(uglify())
              .pipe(gulp.dest('./public/dist'));
  });

  gulp.task('inject-files', ['production'], ()=>{
    let target = gulp.src('./index.html'),
        sources = gulp.src(['./public/dist/*.js']);

       return target.pipe(inject(sources)).pipe(gulp.dest('./'));
  });

  gulp.task('default', ['production', 'inject-files', 'clean']);

})();