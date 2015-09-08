var gulp =  require('gulp');
var jade =  require('gulp-jade');
var sass =  require('gulp-ruby-sass');
var rimraf = require('gulp-rimraf'); 
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var ts = require('gulp-typescript');

var outputPathBase = 'dist';
var outputPathStatic = 'static';
var outputPathType = '';
var outputPath = '';
gulp.task('compile-jade', function() {
    gulp.src('src/templates/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest(outputPath +'/' + outputPathStatic));
});

gulp.task('compile-sass', function () {
    sass('src/sass/')
    .on('error', sass.logError)
    .pipe(gulp.dest(outputPath +'/' + outputPathStatic + '/css/main.css'));
});

gulp.task('copy-files', function () {
    gulp.src('src/assets/**/*.*')
        .pipe(gulp.dest(outputPath +'/' + outputPathStatic + '/assets'));
});

gulp.task('compile-client', function () {
    gulp.src('src/client/**/*.js')
        .pipe(gulp.dest(outputPath +'/'));
});

gulp.task('compile-server', function () {
    gulp.src('src/server/**/*.js')
        .pipe(gulp.dest(outputPath +'/'));
});

gulp.task('clean', function(){
    gulp.src(outputPath +'/**/*', { read: false }) 
        .pipe(rimraf());
});

gulp.task('jshint', function() {    
  //gulp.src('./src/**/*.js', '!./src/assets/**/*.js')
  //  .pipe(jshint())
  //  .pipe(jshint.reporter('default'));    
});

gulp.task('compile', function(){    
    outputPath = 'dist';    
    
    gulp.start('compile-jade');
    gulp.start('compile-sass');
    gulp.start('compile-client');
    gulp.start('compile-server');
    gulp.start('copy-files');
});

gulp.task('default', function(){
    gulp.start('jshint');
    gulp.start('dev');
});

gulp.task('dev', function(){
    gulp.start('compile');
});

gulp.task('production', function(){
    gulp.start('compile');
});

gulp.task('ci', function(){
    gulp.start('compile');
});