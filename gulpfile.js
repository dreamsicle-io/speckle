'use-strict';

const del = require('del');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gulp = require('gulp');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('babelify');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const autoprefixer = require('gulp-autoprefixer');


/**
 * Clean build directory.
 *
 * Process:
 *	 1. Deletes the Docs build directory.
 *
 * Run:
 *	 - Global command: `gulp clean`.
 *	 - Local command: `node ./node_modules/gulp/bin/gulp clean`.
 *	 - NPM script: `npm run clean`.
 */
gulp.task('clean', function cleaner(done) {
	return del('docs/assets/dist', done());
});

/**
 * Lint all JS files.
 *
 * Process:
 *	 1. Lints all JS files. 
 *	 2. Logs the linting errors to the console.
 *	 3. Logs processed files to the console. 
 *
 * Run:
 *	 - Global command: `gulp lint:js`.
 *	 - Local command: `node ./node_modules/gulp/bin/gulp lint:js`.
 */
gulp.task('lint:js', function jsLinter() {
	return gulp.src(['**/*.js', '!node_modules/**', '!docs/assets/dist/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(debug({ title: 'lint:js' }));
});

/**
 * Lint all SCSS files.
 *
 * Process:
 *	 1. Lints all SCSS files. 
 *	 2. Logs the linting errors to the console.
 *	 3. Logs processed files to the console. 
 *
 * Run:
 *	 - Global command: `gulp lint:sass`.
 *	 - Local command: `node ./node_modules/gulp/bin/gulp lint:sass`.
 *	 - NPM script: `npm run lint:sass`.
 */
gulp.task('lint:sass', function sassLinter() {
	return gulp.src(['**/*.scss', '!node_modules/**', '!docs/assets/dist/**'])
		.pipe(sassLint()
			.on('error', function(err) { console.error(err); this.emit('end'); }))
		.pipe(sassLint.format())
		.pipe(debug({ title: 'lint:sass' }));
});

/**
 * Lint all assets.
 *
 * Process:
 *	 1. Runs the `lint:js` task.
 *	 2. Runs the `lint:sass` task.
 *	 
 * Run:
 *	 - Global command: `gulp lint`.
 *	 - Local command: `node ./node_modules/gulp/bin/gulp lint`.
 *	 - NPM command: `npm run lint`.
 */
gulp.task('lint', gulp.series('lint:js', 'lint:sass'));

/**
 * Build JS.
 *
 * Process:
 *	 1. Runs the `lint` task. 
 *	 2. Imports JS modules to file. 
 *	 3. Transpiles the file to CommonJS with Babel.
 *	 4. Minifies the file.
 *	 5. Renames the compiled file to *.min.js.
 *	 6. Writes sourcemaps to initial content.
 *	 7. Writes created files to the build directory.
 *	 8. Logs created files to the console.
 *
 * Run:
 *	 - Global command: `gulp build:js`.
 *	 - Local command: `node ./node_modules/gulp/bin/gulp build:js`.
 */
gulp.task('build:js', gulp.series('lint:js', function jsBuilder() {
	const bundler = browserify('docs/assets/src/js/main.js', { debug: true }).transform(babel, { presets: ['env'] });
	return bundler.bundle()
		.on('error', function(err) { console.error(err); this.emit('end'); })
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('docs/assets/dist/js'))
		.pipe(debug({ title: 'build:js' }));
}));

/**
 * Build Sass.
 *
 * Process:
 *	 1. Runs the `lint:sass` task.
 *	 2. Imports all Sass modules to file.
 *	 3. Compiles the Sass to CSS.
 *	 4. Minifies the file.
 *	 5. Adds all necessary vendor prefixes to CSS.
 *	 6. Renames the compiled file to *.min.css.
 *	 7. Writes sourcemaps to initial content.
 *	 8. Writes created files to the build directory.
 *	 9. Logs created files to the console.
 *
 * Run:
 *	 - Global command: `gulp build:sass`.
 *	 - Local command: `node ./node_modules/gulp/bin/gulp build:sass`.
 */
gulp.task('build:sass', gulp.series('lint:sass', function sassBuilder() {
	return gulp.src('docs/assets/src/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ includePaths: ['node_modules'], outputStyle: 'compressed', cascade: false })
			.on('error', function(err) { console.error(err); this.emit('end'); }))
		.pipe(autoprefixer({ browsers: ['last 5 versions', 'ie >= 9'] }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('docs/assets/dist/css'))
		.pipe(debug({ title: 'build:sass' }));
}));

/**
 * Build all assets.
 *
 * Process:
 *	 1. Runs the `build:js` task.
 *	 2. Runs the `build:sass` task.
 *	 
 * Run:
 *	 - Global command: `gulp build`.
 *	 - Local command: `node ./node_modules/gulp/bin/gulp build`.
 *	 - NPM command: `npm run build`.
 */
gulp.task('build', gulp.series('build:js', 'build:sass'));

/**
 * Watch source files. Lint and build on change.
 *
 * Process:
 *	 1. Runs the `lint:js` task when this file changes.
 *	 2. Runs the `lint:js` and `build:js` tasks in series when `speckle.js`, and docs source js changes.
 *	 3. Runs the `lint:sass` and `build:sass` tasks in series when docs source Sass changes.
 * 
 * Run: 
 *	 - Global command: `gulp watch`.
 *	 - Local command: `node ./node_modules/gulp/bin/gulp watch`.
 *	 - NPM script: `npm run watch`.
 */
gulp.task('watch', function watcher() {
	// Lint js when gulpfile.js changes, but do not build. 
	gulp.watch('gulpfile.js', gulp.series('lint:js'));
	// Watch speckle.js file, and docs src js. Lint and rebuild JS on change.
	gulp.watch(['speckle.js', 'docs/assets/src/**/*.js'], gulp.series('lint:js', 'build:js'));
	// Watch all docs src sass. Lint and rebuild Sass on change.
	gulp.watch(['docs/assets/src/**/*.scss'], gulp.series('lint:sass', 'build:sass'));
});

/**
 * Build all assets (default task). 
 * Note: these tasks run in parallel.
 *
 * Process:
 *	 1. Runs the `build` task.
 *	 2. Runs the `watch` task.
 * 
 * Run: 
 *	 - Global command: `gulp`.
 *	 - Local command: `node ./node_modules/gulp/bin/gulp`.
 *	 - NPM script: `npm start`.
 */
gulp.task('default', gulp.series('build', 'watch'));
