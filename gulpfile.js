'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglifycss = require('gulp-uglifycss'),
    rename = require('gulp-rename'),
    flatten = require('gulp-flatten');

gulp.task('build-css', function() {
    return gulp.src(['src/app/shared/components/common/common.css', 'src/app/shared/components/**/*.css']).pipe(concat('primeng.css')).pipe(gulp.dest('dist/resources'));
});

gulp.task('build-css-prod', function() {
    return gulp
        .src([
            'src/app/shared/components/common/common.css',
            'src/app/shared/components/badge/badge.css',
            'src/app/shared/components/button/button.css',
            'src/app/shared/components/checkbox/checkbox.css',
            'src/app/shared/components/colorpicker/colorpicker-images.css',
            'src/app/shared/components/inputtext/inputtext.css',
            'src/app/shared/components/inputtextarea/inputtextarea.css',
            'src/app/shared/components/password/password.css',
            'src/app/shared/components/radiobutton/radiobutton.css',
            'src/app/shared/components/ripple/ripple.css',
            'src/app/shared/components/tooltip/tooltip.css'
        ])
        .pipe(concat('primeng.css'))
        .pipe(gulp.dest('dist/resources'))
        .pipe(uglifycss({ uglyComments: true }))
        .pipe(rename('primeng.min.css'))
        .pipe(gulp.dest('dist/resources'));
});

gulp.task('copy-component-css', function() {
    return gulp.src(['src/app/shared/components/**/*.css', 'src/app/shared/components/**/images/*.png', 'src/app/shared/components/**/images/*.gif']).pipe(gulp.dest('dist/resources/components'));
});

gulp.task('images', function() {
    return gulp.src(['src/app/shared/components/**/images/*.png', 'src/app/shared/components/**/images/*.gif']).pipe(flatten()).pipe(gulp.dest('dist/resources/images'));
});

gulp.task('themes', function() {
    return gulp.src(['src/assets/components/themes/**/*']).pipe(gulp.dest('dist/resources/themes'));
});

//Copy readme
gulp.task('readme', function() {
    return gulp.src(['README.md']).pipe(gulp.dest('dist'));
});

//Building project with run sequence
gulp.task('build-assets', gulp.series('copy-component-css', 'build-css-prod', 'images', 'themes', 'readme'));