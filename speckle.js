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
		// See: `this.isElement()`.
		if (! element || ! this.isElement(element)) {
			this.throwElementError();
		}
		// Set the default options.
		this.defaultOptions = {
			quantity: 50, // quantity of speckles
			minSize: 5, // smallest speckle (1+, less than `maxSize`)
			maxSize: 50, // largest speckle (1+, greater than `minSize`)
			tbOffset: 50, // top/bottom offset (0+, px)
			lrOffset: 50,  // left/right offset (0+, px)
			minOpacity: 10, // minimum opacity (1-100)
			maxOpacity: 90, // maximum opacity (1-100)
			isBokeh: false, // bokeh effect (blur as a factor of distance)
			isRainbow: true, // randomize color
			color: '', // color if rainbow is false (hex, rgb, hsl, keyword)
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
	 * Check if something is a valid HTML element.
	 * 
	 * @since  0.0.1
	 * @param  {mixed}    element  What to check.
	 * @return {Boolean}           If the element is a valid HTML element or not.
	 */
	isElement(element) {
	    return element instanceof Element;  
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

	/**
	 * Get the container element's dimensions and position.
	 *
	 * @since  0.0.1
	 * @param  {Element}  element  The element to get the dimensions for.
	 * @return {obj}               The element data object containing width, height, and CSS position.
	 */
	getElementData(element) {
		const { width, height } = element.getBoundingClientRect();
		const { position } = window.getComputedStyle(element);
		return {
			width: width, 
			height: height, 
			position: position, 
		};
	}

	/**
	 * Add a class to an element.
	 * 
	 * @param {Element}  element    The element to add classes to.
	 * @param {string}   className  The classes to add to the passed element.
	 */
	addClass(element, className) {
		element.classList.add(className);
	}

	/**
	 * Remove a class from an element.
	 * 
	 * @param {Element}  element    The element to remove classes from.
	 * @param {string}   className  The classes to remove from the passed element.
	 */
	removeClass(element, className) {
		element.classList.remove(className);
	}

	/**
	 * Render the speckles.
	 * 
	 * @since  0.0.1
	 * @param  {Element}  element  The container element to speckle.
	 * @return {void} 
	 */
	render(element) {
		const { quantity, minSize, maxSize, tbOffset, lrOffset, minOpacity, maxOpacity, isRainbow, color, isBokeh, zIndex, isCropped, tagName, attributes } = this.options;
		const { width, height, position } = this.getElementData(element);
		// add the upgraded class.
		this.addClass(element, this.upgradedClass);
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
			// size
			const size = this.getRandomInt(minSize, maxSize);
			const center = (size / 2);
			// top
			const minTop = ((0 - tbOffset) - center);
			const maxTop = ((height + tbOffset) - center);
			const top = this.getRandomInt(minTop, maxTop);
			// left
			const minLeft = (( 0 - lrOffset ) - center);
			const maxLeft = ((width + lrOffset) - center);
			const left = this.getRandomInt(minLeft, maxLeft);
			// color
			var renderColor = color;
			if (isRainbow) {
				renderColor = this.getRandomHex();
			} 
			// z-index
			var renderZIndex = zIndex;
			// box shadow
			var boxShadow = '';
			// bokeh
			if (isBokeh) {
				boxShadow = '0 0 ' + (size / 3) + 'px ' + (size / 3) + 'px ' + color;
				zIndex = (zIndex + size);
			} 
			// opacity
			var opacity = (this.getRandomInt(minOpacity, maxOpacity) * 0.01);
			// Create speckle element according to the `tagName` option.
			const speckle = document.createElement(tagName);
			// Set the index of this attribute as `data-speckle-index` 
			// incase it needs to be accessed by other scripts.
			speckle.setAttribute('data-speckle-index', i);
			// Add styles to the speckle.
			var styles = Object.assign(this.globalStyles, {
				backgroundColor: renderColor, 
				boxShadow: boxShadow, 
				height: size + 'px', 
				left: left + 'px', 
				opacity: opacity, 
				top: top + 'px', 
				width: size + 'px', 
				zIndex: renderZIndex, 
			});
			// loop over the speckle style object keys and apply the styles.
			for (var styleKey in styles) {
				speckle.style[styleKey] = styles[styleKey];
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