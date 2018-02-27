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
			boca: false, // boca lights (blur as factor of distance)
			color: null, // color if rainbow is false
			rainbow: true, // randomize color
			quantity: 50, // quantity of speckles
			minSize: 5, // smallest speckle
			maxSize: 50, // largest speckle
			tbOffset: 50, // top,bottom offset
			lrOffset: 50,  // left,right offset
			minOpacity: 10, // minimum opacity (1-100)
			maxOpacity: 90, // maximum opacity (1-100)
			zIndex: 500, // z-index (boca: the starting z-index)
			crop: false, // apply overflow:hidden to container
			classes: '' // speckle classes (space separated)
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