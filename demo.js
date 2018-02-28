'use-strict';

document.addEventListener('DOMContentLoaded', function(e) {
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
	// Multiple
	const multiple = document.querySelector('#multiple');
	new Speckle(multiple, {
		tbOffset: 96, 
		lrOffset: 128, 
	});
	new Speckle(multiple, {
		quantity: 4, 
		minSize: 8, 
		maxSize: 256, 
		zIndex: 10
	});
	new Speckle(multiple, {
		isBokeh: true,  
		quantity: 24,  
		minSize: 8,  
		maxSize: 128,  
		tbOffset: 128,  
		lrOffset: 256,  
		minOpacity: 25,  
		maxOpacity: 50, 
		zIndex: 4 
	});
});
