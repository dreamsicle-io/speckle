## Crop

### HTML

```html
<div id="crop"></div>
```

### JavaScript

```js
new Speckle(document.querySelector('#crop'), {
	quantity: 6, 
	minSize: 256, 
	maxSize: 768,
	tbOffset: 2, 
	lrOffset: 2, 
	isCropped: true, 
});
```
