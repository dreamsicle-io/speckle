(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Speckle.js
 *
 * A JavaScript module that adds responsive, stylized 
 * speckles to any element; with no dependencies.
 *
 * @package speckle
 * @since   0.0.1
 */
var Speckle = function () {

	/**
  * Constructor.
  *
  * @since  0.0.1
  * @param  {Element}  element  The passed element to speckle.
  * @param  {obj}      options  The options object.
  * @return {void} 
  */
	function Speckle(element, options) {
		_classCallCheck(this, Speckle);

		// throw error if `element` is not a valid HTML element.
		if (!element || !(element instanceof Element)) {
			this.throwElementError();
		}
		// Set the default options.
		this.defaultOptions = {
			quantity: 56, // quantity of speckles
			minSize: 4, // smallest speckle (1+, less than `maxSize`, px)
			maxSize: 56, // largest speckle (1+, greater than `minSize`, px)
			tbOffset: 8, // top/bottom offset (0+, %)
			lrOffset: 8, // left/right offset (0+, %)
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
		var _options = this.options,
		    minSize = _options.minSize,
		    maxSize = _options.maxSize,
		    tbOffset = _options.tbOffset,
		    lrOffset = _options.lrOffset,
		    minOpacity = _options.minOpacity,
		    maxOpacity = _options.maxOpacity;
		// throw error if `minSize` is less than 1, or greater than `maxSize`.

		if (minSize < 1 || minSize > maxSize) {
			this.throwOptionsError('minSize');
		}
		// throw error if `maxSize` is less than 1, or less than `minSize`.
		if (maxSize < 1 || maxSize < minSize) {
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
		if (minOpacity < 0 || minOpacity > 100 || minOpacity > maxOpacity) {
			this.throwOptionsError('minOpacity');
		}
		// throw error if `maxOpacity` is less than 0 or greater than 100; or if is less than `minOpacity`.
		if (maxOpacity < 0 || maxOpacity > 100 || maxOpacity < minOpacity) {
			this.throwOptionsError('maxOpacity');
		}
		// Set the global styles.
		this.globalStyles = {
			borderRadius: '50%',
			display: 'block',
			pointerEvents: 'none',
			position: 'absolute'
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


	_createClass(Speckle, [{
		key: 'parseOptions',
		value: function parseOptions(options, defaultOptions) {
			// if no options are passed, just return the default options.
			if (!options || (typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
				return defaultOptions;
			}
			// init empty `parsedOptions` object.
			var parsedOptions = {};
			// loop default option keys and parse. If the options 
			// object has this key, use it; else, use the default option.
			for (var key in defaultOptions) {
				var value = options[key];
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

	}, {
		key: 'throwElementError',
		value: function throwElementError() {
			throw new Error('Speckle.js\n' + 'A valid HTML Element must be passed to the constructor as the first argument.');
		}

		/**
   * Throw an element error.
   * 
   * @since  0.0.1
   * @return {Error}  The formatted element error.
   */

	}, {
		key: 'throwOptionsError',
		value: function throwOptionsError(key) {
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
			throw new Error('Speckle.js [' + key + ']\n' + message);
		}

		/**
   * Get a random integer between a passed minimum and maximum.
   * 
   * @since  0.0.1
   * @param  {int}  min  The minimum for the returned integer.
   * @param  {int}  max  The maximum for the returned integer.
   * @return {int}       The randomized integer.
   */

	}, {
		key: 'getRandomInt',
		value: function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}

		/**
   * Get a random hex color.
   * 
   * @since  0.0.1
   * @return {string}  A random hex color.
   */

	}, {
		key: 'getRandomHex',
		value: function getRandomHex() {
			return '#' + ('000000' + Math.random().toString(16).slice(2, 8)).slice(-6).toUpperCase();
		}
	}, {
		key: 'getStyles',
		value: function getStyles(element) {
			var _options2 = this.options,
			    minSize = _options2.minSize,
			    maxSize = _options2.maxSize,
			    tbOffset = _options2.tbOffset,
			    lrOffset = _options2.lrOffset,
			    minOpacity = _options2.minOpacity,
			    maxOpacity = _options2.maxOpacity,
			    color = _options2.color,
			    isBokeh = _options2.isBokeh,
			    zIndex = _options2.zIndex;
			// size

			var size = this.getRandomInt(minSize, maxSize);
			var center = size / 2;
			// color
			var renderColor = color || this.getRandomHex();
			// Create the styles object.
			return Object.assign(this.globalStyles, {
				backgroundColor: renderColor,
				boxShadow: isBokeh ? '0 0 ' + size / 3 + 'px ' + size / 3 + 'px ' + renderColor : '',
				height: size + 'px',
				left: 'calc(' + this.getRandomInt(0 - lrOffset, 100 + lrOffset) + '% - ' + center + 'px)',
				opacity: this.getRandomInt(minOpacity, maxOpacity) * 0.01,
				top: 'calc(' + this.getRandomInt(0 - tbOffset, 100 + tbOffset) + '% - ' + center + 'px)',
				width: size + 'px',
				zIndex: zIndex
			});
		}

		/**
   * Render the speckles.
   * 
   * @since  0.0.1
   * @param  {Element}  element  The container element to speckle.
   * @return {void} 
   */

	}, {
		key: 'render',
		value: function render(element) {
			var _options3 = this.options,
			    quantity = _options3.quantity,
			    isCropped = _options3.isCropped,
			    tagName = _options3.tagName,
			    attributes = _options3.attributes;

			var _window$getComputedSt = window.getComputedStyle(element),
			    position = _window$getComputedSt.position;
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
				var speckle = document.createElement(tagName);
				// Set the index of this attribute as `data-speckle-index` 
				// incase it needs to be accessed by other scripts.
				speckle.setAttribute('data-speckle-index', i);
				// Get speckle styles.
				var styles = this.getStyles(element);
				// loop over the speckle style object keys and apply the styles.
				if (styles && (typeof styles === 'undefined' ? 'undefined' : _typeof(styles)) === 'object') {
					for (var styleKey in styles) {
						speckle.style[styleKey] = styles[styleKey];
					}
				}
				// Add the custom attributes to the speckle.
				if (attributes && (typeof attributes === 'undefined' ? 'undefined' : _typeof(attributes)) === 'object') {
					for (var attributeKey in attributes) {
						speckle.setAttribute(attributeKey, attributes[attributeKey]);
					}
				}
				// Append the speckle to the container element.
				element.appendChild(speckle);
			}
		}
	}]);

	return Speckle;
}();

exports.default = Speckle;

},{}]},{},[1])

//# sourceMappingURL=speckle.js.map
