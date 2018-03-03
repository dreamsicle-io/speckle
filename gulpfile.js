'use-strict';

const fs = require('fs');
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
const pug = require('gulp-pug');
const htmlmin = require('gulp-htmlmin');
const markdown = require('markdown-it')();

/**
 * Clean module build directory.
 *
 * Process:
 *	 1. Deletes the module build directory.
 *
 * Run:
 *	 - Global command: `gulp clean:module`.
 *	 - Local command: `node ./node_modules/gulp/bin/gulp clean:module`.
 */
gulp.task('clean:module', function moduleCleaner(done) {
	return del('dist', done());
});

/**
 * Clean docs build directory.
 *
 * Process:
 *	 1. Deletes the docs build directory.
 *
 * Run:
 *	 - Global command: `gulp clean:docs`.
 *	 - Local command: `node ./node_modules/gulp/bin/gulp clean:docs`.
 */
gulp.task('clean:docs', function docsCleaner(done) {
	return del('docs/assets/dist', done());
});

/**
 * Clean docs root index.html file.
 *
 * Process:
 *	 1. Deletes the docs root index.html file.
 *
 * Run:
 *	 - Global command: `gulp clean:html`.
 *	 - Local command: `node ./node_modules/gulp/bin/gulp clean:html`.
 */
gulp.task('clean:html', function htmlCleaner(done) {
	return del('docs/index.html', done());
});

/**
 * Clean docs build directory.
 *
 * Process:
 *	 1. Runs the `clean:module` task.
 *	 2. Runs the `clean:docs` task.
 *
 * Run:
 *	 - Global command: `gulp clean`.
 *	 - Local command: `node ./node_modules/gulp/bin/gulp clean`.
 *	 - NPM command: `npm run clean`.
 */
gulp.task('clean', gulp.series('clean:module', 'clean:docs', 'clean:html'));

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
	return gulp.src(['**/*.js', '!node_modules/**', '!dist/**', '!docs/assets/dist/**'])
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
	return gulp.src(['**/*.scss', '!node_modules/**', '!dist/**', '!docs/assets/dist/**'])
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
 * Build docs JS.
 *
 * Process:
 *	 1. Runs the `lint:js` task. 
 *	 2. Imports JS modules to file. 
 *	 3. Transpiles the file to CommonJS with Browserify and Babel.
 *	 4. Minifies the file.
 *	 5. Renames the compiled file to *.min.js.
 *	 6. Writes sourcemaps to initial content.
 *	 7. Writes created files to the build directory.
 *	 8. Logs created files to the console.
 *
 * Run:
 *	 - Global command: `gulp build:js:docs`.
 *	 - Local command: `node ./node_modules/gulp/bin/gulp build:js:docs`.
 */
gulp.task('build:js:docs', function jsDocsBuilder() {
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
		.pipe(debug({ title: 'build:js:docs' }));
});

/**
 * Build Module JS.
 *
 * Process:
 *	 1. Imports JS modules to file. 
 *	 2. Transpiles the file to CommonJS with Browserify and Babel.
 *	 3. Minifies the file.
 *	 4. Renames the compiled file to *.min.js.
 *	 5. Writes sourcemaps to initial content.
 *	 6. Writes created files to the build directory.
 *	 7. Logs created files to the console.
 *
 * Run:
 *	 - Global command: `gulp build:js:module`.
 *	 - Local command: `node ./node_modules/gulp/bin/gulp build:js:module`.
 */
gulp.task('build:js:module', function jsModuleBuilder() {
	const bundler = browserify('src/js/speckle.js', { 
		standalone: 'Speckle', 
		debug: true 
	}).transform(babel, { 
		presets: ['env'], 
		plugins: ['add-module-exports'] 
	});
	return bundler.bundle()
		.on('error', function(err) { console.error(err); this.emit('end'); })
		.pipe(source('speckle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/js'))
		.pipe(debug({ title: 'build:js:module' }));
});

/**
 * Build all JS.
 *
 * Process:
 *	 1. Runs the `build:js:module` task.
 *	 2. Runs the `build:js:docs` task.
 *	 
 * Run:
 *	 - Global command: `gulp build:js`.
 *	 - Local command: `node ./node_modules/gulp/bin/gulp build:js`.
 */
gulp.task('build:js', gulp.series('lint:js', 'build:js:module', 'build:js:docs'));

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
 * Build Docs HTML.
 *
 * Process:
 *	 1. Imports all HTML partials to file.
 *	 2. Minifies all HTML.
 *	 3. Writes minified html to /docs root.
 *
 * Run:
 *	 - Global command: `gulp build:html`.
 *	 - Local command: `node ./node_modules/gulp/bin/gulp build:html`.
 */
gulp.task('build:html', function htmlBuilder() {
	const locals = {
		// ensure the file is read synchronously and 
		// parsed as json. require() is not sufficient.
		speckle: JSON.parse(fs.readFileSync('package.json')), 
		options: JSON.parse(fs.readFileSync('docs/content/options.json')), 
		// include markdown as a function because filters
		// do not work with variables in pug. Note: this is used for
		// rendering markdown in json data like the description key
		// in the options table. for all other markdown uses in pug,
		// use the filter as `:markdown-it()`.
		markdown: markdown, 
	};
	return gulp.src('docs/views/*.pug')
		.pipe(pug({ locals: locals })
			.on('error', function(err) { console.error(err); this.emit('end'); }))
		.pipe(htmlmin({ collapseWhitespace: true, minifyJS: true, minifyCSS: true })
			.on('error', function(err) { console.error(err); this.emit('end'); }))
		.pipe(gulp.dest('docs'))
		.pipe(debug({ title: 'build:html' }));
});

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
gulp.task('build', gulp.series('build:js', 'build:sass', 'build:html'));

/**
 * Watch source files. Lint and build on change.
 *
 * Process:
 *	 1. Runs the `lint:js` task when this file changes.
 *	 2. Runs the `build:js` tasks in series when module and docs source js changes.
 *	 3. Runs the `build:sass` task when docs source Sass changes.
 *	 4. Runs the `build:html` task when docs source html changes.
 * 
 * Run: 
 *	 - Global command: `gulp watch`.
 *	 - Local command: `node ./node_modules/gulp/bin/gulp watch`.
 *	 - NPM script: `npm run watch`.
 */
gulp.task('watch', function watcher() {
	// Lint js when gulpfile.js changes, but do not build. 
	gulp.watch('gulpfile.js', gulp.series('lint:js'));
	// Watch speckle.js file, and docs src js. Rebuild JS on change.
	gulp.watch(['src/**/*.js', 'docs/assets/src/**/*.js'], gulp.series('build:js'));
	// Watch all docs src sass. Rebuild Sass on change.
	gulp.watch(['docs/assets/src/**/*.scss'], gulp.series('build:sass'));
	// Watch all docs src pug and markdown files. Rebuild HTML on change.
	gulp.watch(['docs/views/**/*.pug', 'docs/content/**/*.+(md|json)'], gulp.series('build:html'));
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
