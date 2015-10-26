/**
 * Created by Juan Gallo on 10/23/15.
 */

var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    uglifycss = require('gulp-uglifycss');


/**
 *
 * We need this task to delete the min file everytime we make a change
 */

gulp.task('delete', function() {
    return gulp.src('assets/css/style.min.css', { read: true })
        .pipe(rimraf())
        .pipe(connect.reload());
});


/**
 * This is a cool webserver, just type 'gulp' in
 * your console and you will believe in magic.
 */

gulp.task('connectDev', function () {
    connect.server({
        port: 8000,
        livereload: true
    });
});

/**
 * Meh, nothing awesome in here, just a task to
 * reload our html when we make a change
 */

gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(connect.reload());
});


/**
 * Stylus is love, with this task we are able
 * to compile the .styl files into .css files
 * so after that we can concatenate them
 */

gulp.task('stylus', ['delete'], function () {
    return gulp.src('assets/stylus/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('assets/css/'))
        .pipe(connect.reload());
});


/** 
 * Lets make an awesome css. 
 * This task is for joining all css files into one 
 * Having multiple css files is cool to read your code 
 * but it is not so cool to have multiple css files in upper 
 * environments. 
 */

gulp.task('concat', ['stylus'], function() {
    gulp.src('assets/css/**/*.css')
        .pipe(uglifycss())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('assets/css/'))
        .pipe(connect.reload());
});

/**
 * We really want a watcher so we don't need to
 * re-run gulp command everytime we make a change
 */

gulp.task('watch', function () {
    gulp.watch(['*.html'], ['html']);
    gulp.watch(['assets/stylus/*.styl'], ['concat']);
});


gulp.task('default', ['connectDev', 'watch']);