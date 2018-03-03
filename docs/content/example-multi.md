## Multi

Multiple Speckles instances may be applied to a container element, all with their own options. Speckle keeps track of itself programattically through it's class, as well as through `data-speckle-*` attributes on the container element and the speckles themselves. 

**Note:** Destroying or rerendering one instance will not affect the others.

### HTML

```html
<div id="multi"></div>
```

### JavaScript

```js
// First, store the container element.
const multi = document.querySelector('#multi');

// Then, apply the speckle instances as layers.
// Use the zIndex option to organize their elevations.

// Layer 1
new Speckle(multi, {
	tbOffset: 36, 
	lrOffset: 36, 
	zIndex: 2, 
});

// Layer 2
new Speckle(multi, {
	quantity: 4, 
	minSize: 8, 
	maxSize: 256, 
	tbOffset: 24, 
	lrOffset: 24, 
	zIndex: 4, 
});

// Layer 3
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
```
