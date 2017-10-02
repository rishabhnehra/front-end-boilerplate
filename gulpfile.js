const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()

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

gulp.task('serve', ['styles'], () => {
	browserSync.init({
		server: './'
	})
	gulp.watch('scss/*.scss', ['styles'])
})