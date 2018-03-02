/**
 * Speckle.js
 *
 * A JavaScript module that adds responsive, stylized 
 * speckles to any element; with no dependencies.
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
		// keep track of this instance number for use in 
		// grouping the speckles, and the `destroy()` method.
		this.instance = Speckle.instance;
		// augment the instance count on the class, not the instance.
		Speckle.instance++;
		// throw error if `element` is not a valid HTML element.
		if (! element || ! (element instanceof Element)) {
			this.throwElementError();
		}
		this.element = element;
		// Set the default options.
		this.defaultOptions = {
			quantity: 56, // quantity of speckles
			minSize: 4, // smallest speckle (1+, less than `maxSize`, px)
			maxSize: 56, // largest speckle (1+, greater than `minSize`, px)
			tbOffset: 8, // top/bottom offset (0+, %)
			lrOffset: 8,  // left/right offset (0+, %)
			minOpacity: 12.5, // minimum opacity (1-100)
			maxOpacity: 87.5, // maximum opacity (1-100)
			isBokeh: false, // bokeh effect (blur as a factor of distance)
			color: '', // color (hex, rgb, hsl, keyword). If none, the colors will be randomized.
			zIndex: 0, // z-index (bokeh: the starting z-index)
			isCropped: false, // apply `overflow: hidden;` to the container
			tagName: 'I', // the Tag Name that the speckle should be rendered as
			attributes: null // attributes object as `key: value` pairs
		};
		// Parse and set options.
		this.options = this.parseOptions(options, this.defaultOptions);
		const { minSize, maxSize, tbOffset, lrOffset, minOpacity, maxOpacity } = this.options;
		// throw error if `minSize` is less than 1, or greater than `maxSize`.
		if ((minSize < 1) || (minSize > maxSize)) {
			this.throwOptionsError('minSize');
		}
		// throw error if `maxSize` is less than 1, or less than `minSize`.
		if ((maxSize < 1) || (maxSize < minSize)) {
			this.throwOptionsError('maxSize');
		}
		// throw error if `tbOffset` is less than 0.
		if (tbOffset < 0) {
			this.throwOptionsError('tbOffset');
		}
		// throw error if `lrOffset` is less than 0.
		if (lrOffset < 0) {
			this.throwOptionsError('lrOffset');
		}
		// throw error if `minOpacity` is less than 0 or greater than 100; or if is greater than `maxOpacity`.
		if ((minOpacity < 0) || (minOpacity > 100) || (minOpacity > maxOpacity)) {
			this.throwOptionsError('minOpacity');
		}
		// throw error if `maxOpacity` is less than 0 or greater than 100; or if is less than `minOpacity`.
		if ((maxOpacity < 0) || (maxOpacity > 100) || (maxOpacity < minOpacity)) {
			this.throwOptionsError('maxOpacity');
		}
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
		this.render();
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
			const value = options[key];
			// If the value is a number, set it no matter what.
			// This prevents issues where passing `0` is read as 
			// no option passed, rendering the default instead.
			if (typeof value === 'number') {
				parsedOptions[key] = value;
			} else {
				parsedOptions[key] = value || defaultOptions[key];
			}
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
		);
	}

	/**
	 * Throw an element error.
	 * 
	 * @since  0.0.1
	 * @return {Error}  The formatted element error.
	 */
	throwOptionsError(key) {
		var message = '';
		if (key === 'minSize') {
			message = 'The value must be greater than or equal to 1, and less than `maxSize`.';
		} else if (key === 'maxSize') {
			message = 'The value must be greater than or equal to 1, and greater than `minSize`.';
		} else if (key === 'tbOffset') {
			message = 'The value must be greater than 0.';
		} else if (key === 'lrOffset') {
			message = 'The value must be greater than 0.';
		} else if (key === 'minOpacity') {
			message = 'The value must be between 1 and 100, and less than `maxOpacity`.';
		} else if (key === 'maxOpacity') {
			message = 'The value must be between 1 and 100, and greater than `minOpacity`.';
		}
		throw new Error(
			`Speckle.js [${key}]\n` + message
		);
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
		return `#${('000000' + Math.random().toString(16).slice(2, 8)).slice(-6).toUpperCase()}`;
	}

	getStyles() {
		const { globalStyles, options } = this;
		const { minSize, maxSize, tbOffset, lrOffset, minOpacity, maxOpacity, color, isBokeh, zIndex } = options;
		// size
		const size = this.getRandomInt(minSize, maxSize);
		const center = (size / 2);
		// color
		const renderColor = color || this.getRandomHex();
		// Create the styles object.
		return Object.assign(globalStyles, {
			backgroundColor: renderColor, 
			boxShadow: isBokeh ? `0 0 ${(size / 3)}px ${(size / 3)}px ${renderColor}` : '', 
			height: `${size}px`, 
			left: `calc(${this.getRandomInt(0 - lrOffset, 100 + lrOffset)}% - ${center}px)`, 
			opacity: (this.getRandomInt(minOpacity, maxOpacity) * 0.01), 
			top: `calc(${this.getRandomInt(0 - tbOffset, 100 + tbOffset)}% - ${center}px)`, 
			width: `${size}px`, 
			zIndex: zIndex, 
		});
	}

	/**
	 * Destroy Speckle.
	 * 
	 * @return {void} 
	 */
	destroy() {
		const { element, instance, upgradedClass } = this;
		// destroy the speckles related to this instance.
		const speckles = element.querySelectorAll(`[data-speckle-group="${instance}"]`);
		if (speckles && (speckles.length > 0)) {
			speckles.forEach((speckle, i) => {
				element.removeChild(speckle);
			});
		}
		// remove this instance from the `data-speckle-groups` 
		// attribute on the container element. If none are left after
		// removal, remove the attribute alltogether.
		const groups = element.getAttribute('data-speckle-groups') || '';
		// initialize the `cleanElement` var as false.
		let cleanElement = false;
		if (groups) {
			// split the groups value by `,` and explode into an array.
			let newGroups = groups.split(',');
			// Using `splice()`, remove the index of this instance from
			// the `newGroups` array. Note: this returns the removed node, 
			// not the new array.
			newGroups.splice(newGroups.indexOf(instance.toString()), 1);
			// if there are any groups left after the removal, 
			// set the `data-speckle-groups` attribute to the 
			// new items as CSV. If there are no items left, remove 
			// the attribute and set `cleanElement` to `true`.
			if (newGroups.length > 0) {
				element.setAttribute('data-speckle-groups', newGroups.join(','));
			} else {
				element.removeAttribute('data-speckle-groups');
				cleanElement = true;
			}
		}
		// fully clean the container element, but only if no speckle 
		// groups are left on the container element by this point.
		if (cleanElement) {
			// if the CSS `position` of the container element was modified
			// by this class, it will have added a `data-speckle-position-mod` 
			// attribute set to `true` or the element's explicit CSS `position` 
			// value if there was one on the element itself prior to the 
			// first initialization.
			const positionMod = element.getAttribute('data-speckle-position-mod');
			if (positionMod) {
				element.style.position = (positionMod === 'true') ? null : positionMod;
				element.removeAttribute('data-speckle-position-mod');
			}
			// remove the upgraded class.
			element.classList.remove(upgradedClass);
			// Remove the overflow mod. if the CSS `overflow` of the container 
			// element was modified by this class, it will have added a 
			// `data-speckle-overflow-mod` attribute set to `true` or the 
			// element's explicit CSS `overflow` value if there was one 
			// on the element itself prior to the first initialization.
			const overflowMod = element.getAttribute('data-speckle-overflow-mod');
			if (overflowMod) {
				element.style.overflow = (overflowMod === 'true') ? null : overflowMod;
				element.removeAttribute('data-speckle-overflow-mod');
			}
		}
	}

	/**
	 * Destroy and rerender the speckles according
	 * to the same options. Simply runs the `destroy()`
	 * method followed by the `render()` method again.
	 * 
	 * @return {void} 
	 */
	rerender() {
		this.destroy();
		this.render();
	}

	/**
	 * Render the speckles.
	 * 
	 * @since  0.0.1
	 * @param  {Element}  element  The container element to speckle.
	 * @return {void} 
	 */
	render() {
		const { element, instance, options, upgradedClass } = this;
		const { quantity, isCropped, tagName, attributes } = options;
		const { position, overflow } = window.getComputedStyle(element);
		const isUpgraded = element.classList.contains(upgradedClass);
		// Set the instance of this class as `data-speckle-group` 
		// incase it needs to be accessed by other scripts. Get the value 
		// and append rather than overwriting as this value can be a CSV 
		// list of speckle groups.
		const oldGroups = element.getAttribute('data-speckle-groups') || '';
		const newGroups = oldGroups ? [oldGroups, instance].join(',') : instance;
		element.setAttribute('data-speckle-groups', newGroups);
		// only add relative positioning to the container element if 
		// it is not already `relative`, `fixed`, or `absolute`.
		if (! isUpgraded && (['relative, absolute, fixed'].indexOf(position) === -1)) {
			// on the container element, save the fact that the CSS `position` has 
			// been modified as a `data-speckle-position-mod` attribute set to `true` 
			// or the explicit `position` value if there is one.
			element.setAttribute('data-speckle-position-mod', element.style.position || true);
			// set the CSS `position`value to `relative` so that the speckles 
			// (which are positioned absolute) know where to live.
			element.style.position = 'relative';
		}
		// Add `overflow: hidden;` to element if `isCropped` is `true`, if
		// overflows are not already hidden on the container element.
		if (! isUpgraded && isCropped && (['hidden'].indexOf(overflow) === -1)) {
			element.setAttribute('data-speckle-overflow-mod', element.style.overflow || true);
			element.style.overflow = 'hidden';
		}
		// render speckles according to quantity.
		for (var i = 1; i <= quantity; i++) {
			// Create speckle element according to the `tagName` option.
			const speckle = document.createElement(tagName);
			// Set the index of this speckle as `data-speckle-index` 
			// incase it needs to be accessed by other scripts.
			speckle.setAttribute('data-speckle-index', i);
			// Set the speckle group as `data-speckle-group` attribute
			// incase it needs to be accessed by other scripts, and
			// for use in the `destroy()` method.
			speckle.setAttribute('data-speckle-group', instance);
			// Get speckle styles.
			const styles = this.getStyles();
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
		// add the upgraded class.
		if (! isUpgraded) {
			element.classList.add(upgradedClass);
		}
	}

}

Speckle.instance = 1;

export default Speckle;