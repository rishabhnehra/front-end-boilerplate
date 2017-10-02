/* eslint-env node */
const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()
const eslint = require('gulp-eslint')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')

gulp.task('default', ['serve'])

gulp.task('serve', ['styles', 'scripts'], () => {
	browserSync.init({
		server: './'
	})
	gulp.watch('./scss/*.scss', ['styles'])
	gulp.watch('./js/*.js', ['scripts'])
	gulp.watch('*.html').on('change', browserSync.reload)
})

gulp.task('styles', () => {
	gulp.src('./scss/*.scss')
		.pipe(sass({outputStyle: 'compressed',}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
		}))
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream())
})

gulp.task('scripts', () => {
	gulp.src('./js/*.js')
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./js1'))
})

gulp.task('lint', () => { 
	gulp.src('./js/*.js')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
})

