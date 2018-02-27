'use-strict';

/**
 * Speckle
 */
class Speckle {

	constructor(element, options) {
		// throw error if `element` is not a valid HTML element.
		// See: this.isElement().
		if (! element || ! this.isElement(element)) {
			this.throwElementError();
		}
		// Prepare the default arguments.
		this.defaultArgs = {
			isBokeh: false, // bokeh effect (blur as a factor of distance)
			isRainbow: true, // randomize color
			color: '', // color if rainbow is false (hex, rgb, hsl, keyword)
			quantity: 50, // quantity of speckles
			minSize: 5, // smallest speckle (1+, less than `maxSize`)
			maxSize: 50, // largest speckle (1+, greater than `minSize`)
			tbOffset: 50, // top/bottom offset (0+, px)
			lrOffset: 50,  // left/right offset (0+, px)
			minOpacity: 10, // minimum opacity (1-100)
			maxOpacity: 90, // maximum opacity (1-100)
			zIndex: 500, // z-index (bokeh: the starting z-index)
			isCropped: false, // apply `overflow: hidden;` to the container
			attributes: null // speckle classes (space separated)
		};
		// Prepare the global styles.
		this.globalStyles = {
			borderRadius: '50%', 
			display: 'block', 
			pointerEvents: 'none', 
			position: 'absolute', 
		};
		// Render speckles.
		this.render(element);
	}

	isElement(element) {
	    return element instanceof Element;  
	}

	throwElementError() {
		throw new Error(
			'Speckle.js\n' + 
			'A valid HTML Element must be passed to the constructor as the first argument.'
		)
	}

	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	getRandomHex() {
		return '#' + (Math.random().toString(16).slice(2, 8) + '000000').slice(-6).toUpperCase();
	}

	getDimensions(element) {
		const dimensions = element.getBoundingClientRect();
		return {
			width: dimensions.width, 
			height: dimensions.height, 
			position: element.style.position, 
		};
	}

	render(element) {
		const { width, height, position } = this.getDimensions(element);
		console.log(width, height, position);
	}

}