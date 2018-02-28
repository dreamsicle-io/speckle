'use-strict';

import Speckle from '../../../../Speckle.js';

/**
 * Initialize masthead speckles.
 *
 * @since  0.0.1
 * @return {void} 
 */
function initMastheadSpeckles() {
	// Layer 2
	new Speckle(document.querySelector('.speckle-masthead'), {
		quantity: 28, 
		minSize: 4, 
		maxSize: 64,
		maxOpacity: 64, 
		isCropped: true, 
		zIndex: 5,
	});
	// Layer 1
	new Speckle(document.querySelector('.speckle-masthead'), {
		quantity: 8, 
		minSize: 256, 
		maxSize: 768,
		maxOpacity: 74, 
		isCropped: true, 
		zIndex: 0,
	});
}

/**
 * Initialize masthead speckles.
 *
 * @since  0.0.1
 * @return {void} 
 */
function initSectionTitleSpeckles() {
	const titles = document.querySelectorAll('.speckle-section__title');
	if (titles && (titles.length > 0)) {
		titles.forEach((title, i) => {
			new Speckle(title, {
				quantity: 16, 
				minSize: 4, 
				maxSize: 18,
				maxOpacity: 64, 
				lrOffset: 64, 
				tbOffset: 36, 
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
		tbOffset: 128, 
		lrOffset: 256, 
	});
	// Small
	new Speckle(document.querySelector('#small'), {
		quantity: 100, 
		minSize: 4, 
		maxSize: 24, 
		tbOffset: 64, 
		lrOffset: 128, 
	});
	// Mono
	new Speckle(document.querySelector('#mono'), {
		color: '#000000', 
	});
	// A Lot
	new Speckle(document.querySelector('#alot'), {
		quantity: 360, 
		tbOffset: 16, 
		lrOffset: 16, 
	});
	// A Lot
	new Speckle(document.querySelector('#alittle'), {
		quantity: 16, 
		tbOffset: 56, 
		lrOffset: 56, 
	});
	// Deco
	new Speckle(document.querySelector('#deco'), {
		quantity: 6, 
		minSize: 256, 
		maxSize: 768,
		tbOffset: 16, 
		lrOffset: 16, 
	});
	// Crop
	new Speckle(document.querySelector('#crop'), {
		quantity: 6, 
		minSize: 256, 
		maxSize: 768,
		tbOffset: 16, 
		lrOffset: 16, 
		isCropped: true, 
	});
	// Bokeh
	new Speckle(document.querySelector('#bokeh'), {
		isBokeh: true, 
		color: '#67b0ff', 
		quantity: 16, 
		minSize: 8, 
		maxSize: 128, 
		tbOffset: 96, 
		lrOffset: 256, 
		minOpacity: 25, 
		maxOpacity: 50, 
	});
	// Multi
	const multi = document.querySelector('#multi');
	new Speckle(multi, {
		tbOffset: 96, 
		lrOffset: 128, 
		zIndex: 1, 
	});
	new Speckle(multi, {
		quantity: 4, 
		minSize: 8, 
		maxSize: 256, 
		zIndex: 2, 
	});
	new Speckle(multi, {
		isBokeh: true, 
		quantity: 24, 
		minSize: 8, 
		maxSize: 128, 
		tbOffset: 128, 
		lrOffset: 256, 
		minOpacity: 25, 
		maxOpacity: 50, 
		zIndex: 3, 
	});
	// Space
	const space = document.querySelector('#space');
	new Speckle(space, {
		quantity: 36, 
		tbOffset: 6, 
		lrOffset: 6, 
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
		tbOffset: 6, 
		lrOffset: 6, 
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
		minSize: 18,
		maxSize: 64,
		minOpacity: 100, 
		maxOpacity: 100, 
	});
}

document.addEventListener('DOMContentLoaded', function(e) {
	initMastheadSpeckles();
	initExampleSpeckles();
	initSectionTitleSpeckles();
});
