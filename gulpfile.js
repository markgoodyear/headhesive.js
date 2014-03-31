/**
 * Modules
 */
var gulp    = require('gulp');
var jshint  = require('gulp-jshint');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var clean   = require('gulp-rimraf');
var header  = require('gulp-header');
var rename  = require('gulp-rename');
var rigger  = require('gulp-rigger');
var pkg     = require('./package.json');



/**
 * Config
 */
var config = {
    name:   'Headhesive',
    src:    'src/headhesive.js',
    dest:   'dist/',
    banner: ['/*!',
        ' * <%= pkg.name %> v<%= pkg.version %> - <%= pkg.description %>',
        ' * Url: <%= pkg.homepage %>',
        ' * Copyright (c) <%= pkg.author.name %> — <%= pkg.author.twitter %> — <%= pkg.author.url %>',
        ' * License: <%= pkg.license %>',
        ' */',
        ''].join('\n')
}


/**
 * Tasks
 */
gulp.task('compile', function() {
    return gulp.src(config.src)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(rigger())
        .pipe(header(config.banner, { pkg: pkg }))
        .pipe(uglify({preserveComments: 'some', compress: false, mangle: false, output:{ beautify: true, indent_level: 2 }}))
        .pipe(gulp.dest(config.dest))
        .pipe(uglify({preserveComments: 'some'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.dest));
});

// Default
gulp.task('default', ['compile']);

// Watch
gulp.task('watch', function() {
    gulp.watch(config.src, ['compile']);
});
