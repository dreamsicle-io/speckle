// import ES6 Module from /src;
// import Speckle from '../../../../src/js/speckle';
// import UMD Module from /dist;
// const Speckle = require('../../../../dist/js/speckle');
// import UMD Module from /dist via ES6;
import Speckle from '../../../../dist/js/speckle';
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/sass/sass';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/shell/shell';

function initCodemirror() {
	function decodeHTML(html){
		let decoder = document.createElement('div');
		decoder.innerHTML = html;
		return (decoder.childNodes.length === 0) ? '' : decoder.childNodes[0].nodeValue;
	}
	// html
	const htmlCodes = document.querySelectorAll('.speckle-code--html');
	if (htmlCodes && htmlCodes.length > 0) {
		htmlCodes.forEach((htmlCode, i) => {
			new CodeMirror((mirror) => {
				htmlCode.parentNode.replaceChild(mirror, htmlCode);
			}, {
				mode: 'htmlmixed', 
				value: decodeHTML(htmlCode.innerHTML), 
				theme: 'cobalt speckle', 
				readOnly: true, 
				lineNumbers: true, 
			});
		});
	}
	// javascript
	const jsCodes = document.querySelectorAll('.speckle-code--js');
	if (jsCodes && jsCodes.length > 0) {
		jsCodes.forEach((jsCode, i) => {
			new CodeMirror((mirror) => {
				jsCode.parentNode.replaceChild(mirror, jsCode);
			}, {
				mode:  'javascript', 
				value: jsCode.innerHTML, 
				theme: 'cobalt speckle', 
				readOnly: true, 
				lineNumbers: true, 
			});
		});
	}
	// javascript (JSON)
	const jsonCodes = document.querySelectorAll('.speckle-code--json');
	if (jsonCodes && jsonCodes.length > 0) {
		jsonCodes.forEach((jsonCode, i) => {
			new CodeMirror((mirror) => {
				jsonCode.parentNode.replaceChild(mirror, jsonCode);
			}, {
				mode:  'javascript', 
				json: true, 
				value: jsonCode.innerHTML, 
				theme: 'cobalt speckle', 
				readOnly: true, 
				lineNumbers: true, 
			});
		});
	}
	// shell
	const shellCodes = document.querySelectorAll('.speckle-code--shell');
	if (shellCodes && shellCodes.length > 0) {
		shellCodes.forEach((shellCode, i) => {
			new CodeMirror((mirror) => {
				shellCode.parentNode.replaceChild(mirror, shellCode);
			}, {
				mode:  'shell', 
				value: shellCode.innerHTML, 
				theme: 'cobalt speckle', 
				readOnly: true, 
				lineNumbers: true, 
			});
		});
	}
}

/**
 * Initialize masthead speckles.
 *
 * @since  0.0.1
 * @return {void} 
 */
function initMastheadSpeckles() {
	const masthead = document.querySelector('.speckle-masthead');
	const mastheadSmall = new Speckle(masthead, {
		quantity: 36, 
		minSize: 4, 
		maxSize: 64,
		maxOpacity: 64, 
		isCropped: true, 
		lrOffset: 4, 
		tbOffset: 4, 
		zIndex: 5,
	});
	const mastheadLarge = new Speckle(masthead, {
		quantity: 12, 
		minSize: 256, 
		maxSize: 768,
		maxOpacity: 74, 
		isCropped: true, 
		lrOffset: 2, 
		tbOffset: 2, 
		zIndex: 0,
	});
	const mastheadTitle = masthead.querySelector('.speckle-masthead__title a');
	mastheadTitle.addEventListener('click', (e) => {
		e.preventDefault();
		mastheadSmall.rerender();
		mastheadLarge.rerender();
	});
}

/**
 * Initialize masthead speckles.
 *
 * @since  0.0.1
 * @return {void} 
 */
function initSectionTitleSpeckles() {
	const titles = document.querySelectorAll('.speckle-section h2');
	if (titles && (titles.length > 0)) {
		titles.forEach((title, i) => {
			new Speckle(title, {
				quantity: 16, 
				minSize: 4, 
				maxSize: 18,
				maxOpacity: 64, 
				lrOffset: 16, 
				tbOffset: 16, 
			});
		});
	}
}

/**
 * Initialize example speckles.
 *
 * @since  0.0.1
 * @return {void} 
 */
function initExampleSpeckles() {
	// Default
	new Speckle(document.querySelector('#default'));
	// Large
	new Speckle(document.querySelector('#large'), {
		quantity: 25, 
		minSize: 128, 
		maxSize: 256, 
		tbOffset: 20, 
		lrOffset: 20, 
	});
	// Small
	new Speckle(document.querySelector('#small'), {
		quantity: 96, 
		minSize: 4, 
		maxSize: 16, 
	});
	// Mono
	new Speckle(document.querySelector('#mono'), {
		color: '#000000', 
	});
	// A Lot
	new Speckle(document.querySelector('#alot'), {
		quantity: 360, 
		tbOffset: 0, 
		lrOffset: 0, 
	});
	// A Lot
	new Speckle(document.querySelector('#alittle'), {
		quantity: 12, 
	});
	// Deco
	new Speckle(document.querySelector('#deco'), {
		quantity: 6, 
		minSize: 256, 
		maxSize: 768,
		tbOffset: 0, 
		lrOffset: 0, 
	});
	// Crop
	new Speckle(document.querySelector('#crop'), {
		quantity: 6, 
		minSize: 256, 
		maxSize: 768,
		tbOffset: 2, 
		lrOffset: 2, 
		isCropped: true, 
	});
	// Bokeh
	new Speckle(document.querySelector('#bokeh'), {
		isBokeh: true, 
		color: '#67b0ff', 
		quantity: 24, 
		minSize: 8, 
		maxSize: 112, 
		lrOffset: 20, 
		tbOffset: 20, 
		minOpacity: 25, 
		maxOpacity: 50, 
	});
	// Multi
	const multi = document.querySelector('#multi');
	new Speckle(multi, {
		zIndex: 2, 
		tbOffset: 36, 
		lrOffset: 36, 
	});
	new Speckle(multi, {
		quantity: 4, 
		minSize: 8, 
		maxSize: 256, 
		tbOffset: 24, 
		lrOffset: 24, 
		zIndex: 4, 
	});
	new Speckle(multi, {
		isBokeh: true, 
		quantity: 24, 
		minSize: 8, 
		maxSize: 128, 
		tbOffset: 24, 
		lrOffset: 24, 
		minOpacity: 25, 
		maxOpacity: 50, 
		zIndex: 6, 
	});
	// Space
	const space = document.querySelector('#space');
	new Speckle(space, {
		quantity: 36, 
		tbOffset: 0, 
		lrOffset: 0, 
		minSize: 2,
		maxSize: 6,
		minOpacity: 64, 
		maxOpacity: 87.5, 
		isCropped: true, 
		zIndex: 2, 
	});
	new Speckle(space, {
		quantity: 128, 
		color: '#ffffff', 
		tbOffset: 0, 
		lrOffset: 0, 
		minSize: 2,
		maxSize: 6,
		minOpacity: 87.5, 
		maxOpacity: 100, 
		isCropped: true, 
		zIndex: 0, 
	});
	// Cheese
	new Speckle(document.querySelector('#cheese'), {
		color: '#ffffff', 
		quantity: 32,
		minSize: 16,
		maxSize: 64,
		minOpacity: 100, 
		maxOpacity: 100, 
		tbOffset: 4, 
		lrOffset: 4, 
	});
}

function initCopyrightDate() {
	const copyright = document.querySelector('#copyright');
	copyright.innerHTML = copyright.innerHTML.replace(/(%CURRENT_YEAR%)/g, new Date().getFullYear());
}

document.addEventListener('DOMContentLoaded', (e) => {
	initMastheadSpeckles();
	initExampleSpeckles();
	initSectionTitleSpeckles();
	initCopyrightDate();
	initCodemirror();
});
