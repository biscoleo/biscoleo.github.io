var gulp = require('gulp');
var plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const dartSass = require('gulp-dart-sass'); // Use Dart Sass
const wait = require('gulp-wait');
const babel = require('gulp-babel');
const rename = require('gulp-rename');

// Scripts task
gulp.task('scripts', function() {
    return gulp.src('./js/scripts.js')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(babel({
            presets: [['@babel/env', {modules: false}]]
        }))
        .pipe(uglify({
            output: {
                comments: '/^!/'
            }
        }))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('./js'));
});

// Styles task
gulp.task('styles', function () {
    return gulp.src('./scss/styles.scss')
        .pipe(wait(250))
        .pipe(dartSass({outputStyle: 'compressed'}).on('error', dartSass.logError)) // Use Dart Sass here
        .pipe(gulp.dest('./css'));
});

// Watch task
gulp.task('watch', function() {
    console.log('Watching for changes...');
    gulp.watch('./js/scripts.js', gulp.series('scripts')).on('change', function(path) {
        console.log(`File ${path} was changed`);
    });
    gulp.watch('./scss/styles.scss', gulp.series('styles')).on('change', function(path) {
        console.log(`File ${path} was changed`);
    });
});