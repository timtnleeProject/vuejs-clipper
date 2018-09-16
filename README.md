# vuejs-clipper

[![not found](https://api.travis-ci.org/timtnleeProject/vuejs-clipper.svg?branch=master)](https://travis-ci.org/timtnleeProject/vuejs-clipper#)

* Vue.js image clipping components using [vue-rx](https://github.com/vuejs/vue-rx).
* Add image clipping components to your vue application in nothing flat.
* Touch devices supported and fully responsive.

## Demo

[live demo & examples](https://timtnleeproject.github.io/vuejs-clipper)

## Menu

* [Version Released](#version-released)
* [Notice](#notice)
* [Installation](#installation)
* [Components](#components)

## Version Released

* 0.1.0
  * First Released

## Notice

Before using the plugin & compoenets, here's something you should know :

* It's based on **vue-rx**.
* Use vuejs-clipper plugin also add **vue-rx** plugin to vue.
* Components are responsive base on **width** instead of height.
* You can clip your own images (local uploaded images or images served on your site) ,but you cannot clip a cross origin image.
* Components' **input** is a image URL, **ouput** is a canvas element, they only help you clip images to canvas, you need to handle other things like *transform file input to image URL* or *transform output canvas to image* by yourself.

## Installation

### NPM & ESM

install vuejs-clipper and peer dependencies.

```bash
$npm install vuejs-clipper rxjs --save
```


#### (1) separately import components (need .vue & sass loader)

use vue-rx

```javascript
import Vue from 'vue'
import VueRx from 'vue-rx'
// install vue-rx
Vue.use(VueRx)
```

then import in your components (SFC)

```javascript
import { clipperBasic, clipperPreview } from 'vuejs-clipper'

export default {
    components: {
      clipperBasic,
      clipperPreview
    }
}
```

#### (2) use vuejs-clipper plugin

use vuejs-clipper plugin also add **vue-rx** plugin to Vue.

register all components to Vue global scope

```javascript
import Vue from 'vue'
import VuejsClipper from 'vuejs-clipper'
 
// install
Vue.use(VuejsClipper)
```

register some components to global with default component name

```javascript
Vue.use(VuejsClipper ,{
    components: {
        clipperBasic: true,
        clipperPreview: true
    }
})
```

with customized component name

```javascript
Vue.use(VuejsClipper ,{
    components: {
        clipperBasic: 'image-clipper-basic',
        clipperPreview: 'my-preview'
    }
})
```

not register any components, but with some plugin options

```javascript
Vue.use(VuejsClipper ,{
    parentPropName: 'myCustomerName',
    components: null
})
```

### Script

Include vuejs-clipper umd script after Vue.js.


```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script src="./dist/vuejs-clipper.umd.js"></script>
<link rel="stylesheet" href="./dist/vuejs-clipper.css">
```

### Use in html/template

```html
<clipper-basic src="example.jpg"></clipper-basic>
```

## Components

### clipper-basic

a image clipping component

```javascript
import { clipperBasic } from 'vuejs-clipper'
```

* Props

| Prop   |   Type |default|Description | 
|--------|-------:|------:|:-----|
| src    |  string|       | image src |
| preview| string |       | matches `clipper-preview`'s name to show preview image.|
| border |  number|   1   | border width |
| outline| number | 6     | outlines near by the border to help user zooming. |
| corner | boolean| true  | show corner layout |
| grid   | boolean| true  | show grid layout|
| ratio  | number |       | ratio of clipping area. ex: `1`, `4/3` .|
| mode   | 'normal'/'switch' | 'normal' | if ratio is set, this prop will affect how clipping area zoom.|
|bgColor |string  | 'white' | background color|
|shadow|string|'rgba(0,0,0,0.4)'|shadow color|
|rotate | number | 0 | rotate degree |
|scale  | number | 1 | transform scale |
|touchCreate| boolean | true | enable/disable create new clipping area on touch device |

* Methods

| method | parameter | return| Description |
|-|-|-|-|
| clip | | canvas element |get clipping canvas element|

* Slot

|slot|Description|
|-|-|
|placeholder|if no `src` provided, show placeholder|

```html
<clipper-basic src="">
  <div slot="placeholder">No image</div>
</clipper-basic>
```

### clipper-fixed

a image clipping component

```javascript
import { clipperFixed } from 'vuejs-clipper'
```

* Props

| Prop   |   Type |default|Description |
|--------|-------:|------:|:-----|
| src    |  string|       | image src |
| preview| string |       | matches `clipper-preview`'s name to show preview image.|
| ratio  | number |   1   | ratio of clipping area. ex: `1`, `4/3` .|
| zoomRate| number | 0.04 | zooming faster if this value is larger|
|minScale | number| 0.1 | minimum transform scale |
| border |  number|   1   | border width |
| grid   | boolean| true  | show grid layout|
| bgColor |string  | 'white' | background color|
|shadow|string|'rgba(0,0,0,0.4)'|shadow color|
|rotate | number | 0 | rotate degree |

* Method

| method | parameter | return| Description |
|-|-|-|-|
| clip | | canvas element |get clipping canvas element|

* Slot

|slot|Description|
|-|-|
|placeholder|if no `src` provided, show placeholder|

```html
<clipper-fixed src="">
  <div slot="placeholder">No image</div>
</clipper-fixed>
```

### clipper-preview

preview clipping result

```javascript
import { clipperPreview } from 'vuejs-clipper'
```

* Props

| Prop   |   Type |default|Description |
|--------|-------:|------:|:-----|
| name | string | | name that matches clipper component's preview property |

* Slot

|slot|Description|
|-|-|
|placeholder|if no `src` provided, show placeholder|

### clipper-range

a simple input range component

```javascript
import { clipperPreview } from 'vuejs-clipper'
```

use `v-model` binding data with `clipper-range`

* Props

| Prop   |   Type |default|Description |
|--------|-------:|------:|:-----|
| max | number | 10 | maximum value of range |
| min | number | 10 | minimum value of range |