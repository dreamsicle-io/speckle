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
	 * @param  {Element}  element  The passed element to speckle.
	 * @param  {obj}      options  The options object.
	 * @return {void} 
	 */
	constructor(element, options) {
		// throw error if `element` is not a valid HTML element.
		if (! element || ! element instanceof Element) {
			this.throwElementError();
		}
		// Set the default options.
		this.defaultOptions = {
			quantity: 56, // quantity of speckles
			minSize: 4, // smallest speckle (1+, less than `maxSize`)
			maxSize: 56, // largest speckle (1+, greater than `minSize`)
			tbOffset: 56, // top/bottom offset (0+, px)
			lrOffset: 56,  // left/right offset (0+, px)
			minOpacity: 12.5, // minimum opacity (1-100)
			maxOpacity: 87.5, // maximum opacity (1-100)
			isBokeh: false, // bokeh effect (blur as a factor of distance)
			color: '', // color (hex, rgb, hsl, keyword). If none, the colors will be randomized.
			zIndex: 500, // z-index (bokeh: the starting z-index)
			isCropped: false, // apply `overflow: hidden;` to the container
			tagName: 'I', // the Tag Name that the speckle should be rendered as
			attributes: null // attributes object as `key: value` pairs
		};
		// Parse and set options.
		this.options = this.parseOptions(options, this.defaultOptions);
		// Set the global styles.
		this.globalStyles = {
			borderRadius: '50%', 
			display: 'block', 
			pointerEvents: 'none', 
			position: 'absolute', 
		};
		// Set the upgraded class.
		this.upgradedClass = 'speckle--upgraded';
		// Render speckles.
		this.render(element);
	}

	/**
	 * Parse the passed options against the defaults.
	 * 
	 * @param  {obj}  options         The passed in user options object.
	 * @param  {obj}  defaultOptions  The default options object.
	 * @return {obj}                  The parsed options object.
	 */
	parseOptions(options, defaultOptions) {
		// if no options are passed, just return the default options.
		if (! options || typeof options !== 'object') {
			return defaultOptions;
		}
		// init empty `parsedOptions` object.
		var parsedOptions = {};
		// loop default option keys and parse. If the options 
		// object has this key, use it; else, use the default option.
		for (var key in defaultOptions) {
			parsedOptions[key] = options[key] || defaultOptions[key];
		}
		// return the parsed options.
		return parsedOptions;

	}

	/**
	 * Throw an element error.
	 * 
	 * @since  0.0.1
	 * @return {Error}  The formatted element error.
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
	 * @param  {int}  min  The minimum for the returned integer.
	 * @param  {int}  max  The maximum for the returned integer.
	 * @return {int}       The randomized integer.
	 */
	getRandomInt(min, max) {
		return Math.floor(Math.random() * ((max - min) + 1) + min);
	}

	/**
	 * Get a random hex color.
	 * 
	 * @since  0.0.1
	 * @return {string}  A random hex color.
	 */
	getRandomHex() {
		return '#' + ('000000' + Math.random().toString(16).slice(2, 8)).slice(-6).toUpperCase();
	}

	getStyles(element) {
		const { minSize, maxSize, tbOffset, lrOffset, minOpacity, maxOpacity, color, isBokeh, zIndex } = this.options;
		const { width, height } = element.getBoundingClientRect();
		// size
		const size = this.getRandomInt(minSize, maxSize);
		const center = (size / 2);
		// top
		const minTop = ((0 - tbOffset) - center);
		const maxTop = ((height + tbOffset) - center);
		// left
		const minLeft = (( 0 - lrOffset ) - center);
		const maxLeft = ((width + lrOffset) - center);
		// color
		var renderColor = color || this.getRandomHex();
		// Add styles to the speckle.
		return Object.assign(this.globalStyles, {
			backgroundColor: renderColor, 
			boxShadow: isBokeh ? ('0 0 ' + (size / 3) + 'px ' + (size / 3) + 'px ' + renderColor) : '', 
			height: size + 'px', 
			left: this.getRandomInt(minLeft, maxLeft) + 'px', 
			opacity: (this.getRandomInt(minOpacity, maxOpacity) * 0.01), 
			top: this.getRandomInt(minTop, maxTop) + 'px', 
			width: size + 'px', 
			zIndex: isBokeh ? (zIndex + size) : zIndex, 
		});
	}

	/**
	 * Render the speckles.
	 * 
	 * @since  0.0.1
	 * @param  {Element}  element  The container element to speckle.
	 * @return {void} 
	 */
	render(element) {
		const { quantity, isCropped, tagName, attributes } = this.options;
		const { position } = window.getComputedStyle(element);
		// add the upgraded class.
		element.classList.add(this.upgradedClass);
		// add relative positioning to the element if it 
		// is not already `relative`, `fixed`, or `absolute`.
		if (['relative, absolute, fixed'].indexOf(position) === -1) {
			element.style.position = 'relative';
		}
		// Add `overflow: hidden;` to element if `isCropped` is `true`.
		if (isCropped) {
			element.style.overflow = 'hidden';
		}
		// render speckles according to quantity.
		for (var i = 1; i <= quantity; i++) {
			// Create speckle element according to the `tagName` option.
			const speckle = document.createElement(tagName);
			// Set the index of this attribute as `data-speckle-index` 
			// incase it needs to be accessed by other scripts.
			speckle.setAttribute('data-speckle-index', i);
			// Get speckle styles.
			const styles = this.getStyles(element);
			// loop over the speckle style object keys and apply the styles.
			if (styles && typeof styles === 'object') {
				for (var styleKey in styles) {
					speckle.style[styleKey] = styles[styleKey];
				}
			}
			// Add the custom attributes to the speckle.
			if (attributes && typeof attributes === 'object') {
				for (var attributeKey in attributes) {
					speckle.setAttribute(attributeKey, attributes[attributeKey]);
				}
			}
			// Append the speckle to the container element.
			element.appendChild(speckle);
		}
	}

}