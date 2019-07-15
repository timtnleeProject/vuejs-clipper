/*
    * methods for calculating position layout,
    * extended by clipper-basic-component
*/
import _commonMethods from './common-methods'
import _basicMethods from './basic-methods'
import _fixedMethods from './fixed-methods'

import { fromEvent } from 'rxjs'

import np from '../../namespace.js'

const basicMethods = Object.assign(_basicMethods, _commonMethods)
const fixedMethods = Object.assign(_fixedMethods, _commonMethods)

export { basicMethods }
export { fixedMethods }

/**  Listeners */
const rxEventListeners = {
  beforeCreate () {
    this.mousedown$ = fromEvent(window, 'mousedown')
    this.mousemove$ = fromEvent(window, 'mousemove')
    this.mouseup$ = fromEvent(window, 'mouseup')
    this.touchstart$ = fromEvent(window, 'touchstart', { passive: false })
    this.touchmove$ = fromEvent(window, 'touchmove', { passive: false })
    this.touchend$ = fromEvent(window, 'touchend', { passive: false })
  }
}

const rxWheelListeners = {
  beforeCreate () {
    this.wheel$ = fromEvent(window, 'wheel', { passive: false })
  }
}
export { rxEventListeners }
export { rxWheelListeners }
const pluginMethods = {
  methods: {
    clip: function (opt) {
      const drawPos = this.getDrawPos(opt)
      const ctx = this.canvasEl.getContext('2d')
      const width = drawPos.pos.swidth // dw
      const height = drawPos.pos.sheight// dh
      this.canvasEl.width = width
      this.canvasEl.height = height
      ctx.fillStyle = this.bgColor
      ctx.fillRect(0, 0, width, height)
      ctx.translate(drawPos.translate.rotateX, drawPos.translate.rotateY)
      ctx.rotate(this.rotate * Math.PI / 180)
      ctx.translate(drawPos.translate.drawX - drawPos.translate.rotateX, drawPos.translate.drawY - drawPos.translate.rotateY)
      ctx.drawImage(this.imgEl, 0, 0)
      if (opt) {
        const canvas = document.createElement('CANVAS')
        canvas.width = drawPos.pos.dwidth
        canvas.height = drawPos.pos.dheight
        canvas.getContext('2d').drawImage(this.canvasEl, 0, 0, drawPos.pos.dwidth, drawPos.pos.dheight)
        return canvas
      } else {
        return this.canvasEl
      }
    },
    callPreview: function (method, ...arg) {
      const parentPropName = np.parentPropName
      if (!this.preview) return
      if (!this.$parent[parentPropName]) return // "You register to use clipper-preview But No clipper-view Component detected.";
      let previews = this.$parent[parentPropName][this.preview]
      if (!previews) return // `preview with name "${this.preview}" not found`;
      previews.forEach(p => {
        p[method](...arg)
      })
    },
    emit: function (name, arg) {
      this.$emit(name, arg)
    }
  }
}

export { pluginMethods }
