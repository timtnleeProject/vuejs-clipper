const fixedMethods = {
  // translatePos: function () {
  //     return this.imgEl.getBoundingClientRect();
  // },
  wrapPos: function () {
    return this.wrapEl.getBoundingClientRect()
  },
  scalePos: function () {
    return this.scaleEl.getBoundingClientRect()
  },
  translatePos: function () {
    return this.translateEl.getBoundingClientRect()
  },
  toX: function (value) { // to X axis percentage 0~100 !
    const scale = this.scalePos()
    return value / scale.width * 100
  },
  toY: function (value) { // to Y axis percentage 0~100 !
    const scale = this.scalePos()
    return value / scale.height * 100
  },
  // eToBg: function (e, direction) {
  //     return this.eTo(e, direction, '.bg');
  // },
  isDragElement: function (e) {
    return this.wrapEl.contains(e.target)
  },
  dragDownPos: function (e) {
    const translatePos = this.translatePos()
    const scalePos = this.scalePos()
    const offset = {
      left: translatePos.left - scalePos.left,
      top: translatePos.top - scalePos.top,
      clientX: e.clientX,
      clientY: e.clientY
    }
    return offset
  },
  delta: function ({ down, move }) {
    const left = move.clientX - down.clientX + down.left
    const top = move.clientY - down.clientY + down.top
    return { left, top }
  },
  towPointsTouches: function (e) {
    return e.touches
  },
  setOrigin: function (down) {
    return {
      down: [down[0], down[1]],
      origin: this.scalePos().width
    }
  },
  twoPointsDelta: function ({ down, move }) {
    const x = Math.abs(move[0].clientX - move[1].clientX) - Math.abs(down[0].clientX - down[1].clientX)
    const y = Math.abs(move[0].clientY - move[1].clientY) - Math.abs(down[0].clientY - down[1].clientY)
    down[0] = move[0]
    down[1] = move[1]
    const wrapPos = this.wrapPos()
    if (Math.abs(x) >= Math.abs(y)) {
      return x / wrapPos.width
    } else {
      return y / wrapPos.height
    }
  },
  getDrawPos: function (opt) {
    const { wPixel, maxWPixel } = opt || {}
    const areaPos = this.areaEl.getBoundingClientRect()
    const translatePos = this.translatePos()
    const imgW = this.imgEl.naturalWidth
    const viewL = areaPos.left - translatePos.left + this.border
    const viewT = areaPos.top - translatePos.top + this.border
    const rate = imgW / translatePos.width
    const translate = {
      rotateX: (translatePos.left + translatePos.width / 2 - (areaPos.left + this.border)) * rate,
      rotateY: (translatePos.top + translatePos.height / 2 - (areaPos.top + this.border)) * rate,
      drawX: (translatePos.left - (areaPos.left + this.border)) * rate,
      drawY: (translatePos.top - (areaPos.top + this.border)) * rate
    }
    const swidth = areaPos.width - this.border * 2
    const sheight = areaPos.height - this.border * 2
    const dwidth = (maxWPixel)
      ? Math.min((wPixel || swidth * rate), maxWPixel)
      : wPixel || swidth * rate
    const pos = {
      sx: viewL * rate, // sx
      sy: viewT * rate, // sy
      swidth: swidth * rate, // sWidth
      sheight: sheight * rate, // sHeight
      dx: 0, // dx
      dy: 0, // dy
      dwidth: dwidth, // dWidth
      dheight: dwidth * sheight / swidth// dHeight
    }
    pos[Symbol.iterator] = function * () {
      for (let k in pos) {
        yield pos[k]
      }
    }
    return {
      pos,
      translate
    }
  },
  calcWheelScaling: function (delta) {
    const origin = this.bgWH$
    let rate = this.zoomRate * Math.max(origin, 0.8) * delta
    return Math.max(origin + rate, this.minScale)
  },
  calcTouchScaling: function (delta) {
    const origin = this.bgWH$
    let rate = Math.max(origin, 0.8) * delta
    return Math.max(origin + rate, this.minScale)
  }
}

export default fixedMethods
