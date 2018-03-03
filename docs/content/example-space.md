## Space

### HTML

```html
<div id="space"></div>
```

### JavaScript

```js
const space = document.querySelector('#space');

new Speckle(space, {
	quantity: 36, 
	tbOffset: 0, 
	lrOffset: 0, 
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
	tbOffset: 0, 
	lrOffset: 0, 
	minSize: 2,
	maxSize: 6,
	minOpacity: 87.5, 
	maxOpacity: 100, 
	isCropped: true, 
	zIndex: 0, 
});
```
