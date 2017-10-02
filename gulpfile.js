/* eslint-env node */
const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()
const eslint = require('gulp-eslint')

gulp.task('default', ['serve'])

gulp.task('styles', () => {
	gulp.src('./scss/*.scss')
		.pipe(sass({outputStyle: 'compressed',}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
		}))
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream())
})

gulp.task('lint', () => { 
	gulp.src(['./js/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
})

gulp.task('serve', ['styles', 'lint'], () => {
	browserSync.init({
		server: './'
	})
	gulp.watch('./scss/*.scss', ['styles'])
	gulp.watch('./js/*.js', ['lint'])
})