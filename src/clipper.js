import clipperPreview from './components/clipper-preview.vue'
import clipperRange from './components/clipper-range.vue'
import clipperBasic from './components/clipper-basic.vue'
import clipperFixed from './components/clipper-fixed.vue'
import clipperUpload from './components/clipper-upload.vue'

import np from './namespace'

const install = function (Vue, options) {
  const components = {
    clipperBasic: {
      component: clipperBasic,
      name: 'clipper-basic'
    },
    clipperPreview: {
      component: clipperPreview,
      name: 'clipper-preview'
    },
    clipperRange: {
      component: clipperRange,
      name: 'clipper-range'
    },
    clipperFixed: {
      component: clipperFixed,
      name: 'clipper-fixed'
    },
    clipperUpload: {
      component: clipperUpload,
      name: 'clipper-upload'
    }
  }
  const registerComponent = (name) => {
    Vue.component(components[name].name, components[name].component)
  }

  options = options || {}
  np.parentPropName = options.parentPropName || np.parentPropName
  options.components = (options.components === undefined) ? components : options.components// if no components property, register all component
  for (let k in options.components) {
    if (!components[k]) throw new Error(`Invalid components "${k}" in vurjs-clipper plugin`)
    components[k].name = (typeof options.components[k] === 'string') ? options.components[k] : components[k].name
    registerComponent(k)
  }
}

const plugin = {
  install
}

export default plugin

// script include auto plugin
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

export { clipperBasic, clipperFixed, clipperPreview, clipperRange, clipperUpload }
