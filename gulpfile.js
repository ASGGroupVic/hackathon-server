var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');

gulp.task('mocha', function () {
  return gulp.src(['tests/*.js'], { read: false })
    .pipe(mocha({ reporter: 'spec' }))
    .on('error', gutil.log);
});

gulp.task('watch-mocha', function () {
  gulp.watch(['routes/**', './*.js', 'tests/**'], ['mocha']);
});

gulp.task('lint', function () {
  return gulp.src(['./routes/v1/*.js', './routes/v1/services/*.js', './routes/v1/repositories/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true }))
    .pipe(jshint.reporter('fail'));
});

gulp.task('bump', function () {
  var bump = require('gulp-bump');
  gulp.src('./package.json')
    .pipe(bump({type: 'patch', indent: 4 }))
    .pipe(gulp.dest('./'));
});

gulp.task('deploy', ['lint', 'mocha'], function () {
  var shell = require('shelljs');

  if (!shell.which('git')) {
    console.error('You need git installed to deploy.');
    shell.exit(1);
  }

  // push our changes to a remote named heroku; replace this with
  // a full url to the heroku repo if you don't have a named remote
  if (shell.exec('git push --force heroku master').code !== 0) {
    console.error('Pushing to heroku failed');
    shell.exit(1);
  }
});