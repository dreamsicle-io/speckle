'use-strict';

/**
 * Speckle.js
 *
 * A Javascript plugin that adds stylized speckles 
 * to any element, with no dependencies.
 *
 * @package speckle
 * @since   0.0.1
 */
class Speckle {
	
	/**
	 * Constructor.
	 *
	 * @since  0.0.1
	 * @param  {Element} element The passed element to speckle.
	 * @param  {object} options The options object.
	 * @return {void} 
	 */
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

	/**
	 * Check if something is a valid HTML element.
	 * 
	 * @since  0.0.1
	 * @param  {mixed}   element What to check.
	 * @return {Boolean}         If the element is a valid HTML element or not.
	 */
	isElement(element) {
	    return element instanceof Element;  
	}

	/**
	 * Throw an element error.
	 * 
	 * @since  0.0.1
	 * @return {Error} The formatted element error.
	 */
	throwElementError() {
		throw new Error(
			'Speckle.js\n' + 
			'A valid HTML Element must be passed to the constructor as the first argument.'
		)
	}

	/**
	 * Get a random integer between a passed minimum and maximum.
	 * 
	 * @since  0.0.1
	 * @param  {int} min The minimum for the returned integer.
	 * @param  {int} max The maximum for the returned integer.
	 * @return {int}     The randomized integer.
	 */
	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	/**
	 * Get a random hex color.
	 * 
	 * @since  0.0.1
	 * @return {string} A random hex color.
	 */
	getRandomHex() {
		return '#' + (Math.random().toString(16).slice(2, 8) + '000000').slice(-6).toUpperCase();
	}

	/**
	 * Get the container element's dimensions.
	 *
	 * @since  0.0.1
	 * @param  {Element} element The element to get the dimensions for.
	 * @return {object}          The dimensions object containing width, height, and CSS position.
	 */
	getElementDimensions(element) {
		const dimensions = element.getBoundingClientRect();
		return {
			width: dimensions.width, 
			height: dimensions.height, 
			position: element.style.position, 
		};
	}

	/**
	 * Render the speckles.
	 * 
	 * @since  0.0.1
	 * @param  {Element} element The container element to speckle.
	 * @return {void} 
	 */
	render(element) {
		const { width, height, position } = this.getElementDimensions(element);
		console.log(width, height, position);
	}

}