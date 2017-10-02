const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('default', () => {
	console.log('It\'s Working')
})

gulp.task('styles', () => {
	gulp.src('./scss/*/*.scss')
		.pipe(sass({outputStyle: 'compressed',}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
		}))
		.pipe(gulp.dest('./dist/css'))
})