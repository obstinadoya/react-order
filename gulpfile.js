var gulp = require('gulp'),
	browserify = require('browserify'),
	reactify = require('reactify'),
	transform = require('vinyl-transform'),
	uglify = require('gulp-uglify'),
	connect = require('gulp-connect'),
	plumber = require('gulp-plumber');

var paths = {
	'js': './javascript'
};

gulp.task('buildjs', function(){
	var browserified = transform(function(filename) {
	    var b = browserify(filename).transform(reactify);
	    return b.bundle();
	});

	gulp.src(paths.js+'/app.js')
		.pipe(plumber())
		.pipe(browserified)
	    .pipe(gulp.dest('./dist'))
	    .pipe(connect.reload())
	    .on('error', function(){ console.log('Error!'); });
});

gulp.task('watch', ['buildjs', 'connect'], function(){
	gulp.watch(paths.js+'/**/*.js', ['buildjs']);
});

gulp.task('connect', function(){
	connect.server({
        livereload: true,
        port: 8400
    });
})

gulp.task('default', function(){});