const clipperMethods = {
  eToArea: function (e, direction) {
    return this.eTo(e, direction, 'area')
  },
  areaPos: function () {
    const rect = this.areaEl.getBoundingClientRect()
    return rect
  },
  zoomPos: function () {
    const rect = this.zoomEl.getBoundingClientRect()
    return rect
  },
  scalePos: function () {
    return this.scaleEl.getBoundingClientRect()
  },
  imgPos: function () {
    return this.imgEl.getBoundingClientRect()
  },
  eInZoom: function (e) {
    const zoomPos = this.zoomEl.getBoundingClientRect()
    return {
      width: zoomPos.width,
      height: zoomPos.height,
      left: e.clientX - zoomPos.left,
      top: e.clientY - zoomPos.top
    }
  },
  zoomInArea: function () { // zoom rect & zoom pos related to area
    const areaPos = this.areaEl.getBoundingClientRect()
    const zoomPos = this.zoomEl.getBoundingClientRect()
    return Object.assign(zoomPos, {
      offsetLeft: zoomPos.left - areaPos.left,
      offsetTop: zoomPos.top - areaPos.top,
      maxLeft: areaPos.width - zoomPos.width,
      maxTop: areaPos.height - zoomPos.height
    })
  },
  toX: function (value) { // to X axis percentage 0~100 !
    const area = this.areaPos()
    return Math.min(Math.max(value / (area.width) * 100, 0), 100)
  },
  toY: function (value) { // to Y axis percentage 0~100 !
    const area = this.areaPos()
    return Math.min(Math.max(value / (area.height) * 100, 0), 100)
  },
  /* 拖曳drag */
  isDragElement: function (e) {
    return e.target === this.dragEl
  },
  dragMoving: function ({ down, move }) {
    const left = this.toX(this.eToArea(move, 'left') - down.left)
    const top = this.toY(this.eToArea(move, 'top') - down.top)
    // set max position
    return { left, top, down, move }
  },
  repositionDrag: function ({ left, top, down, move }) { // validate @left, @top, and reposition @down if nedded.
    const zoom = this.zoomInArea()
    const maxLeft = this.toX(zoom.maxLeft)
    const maxTop = this.toY(zoom.maxTop)
    left = Math.min(left, maxLeft)
    top = Math.min(top, maxTop)
    if (left === maxLeft || left === 0) {
      // 轉換拖曳點X
      const eInZoom = this.eInZoom(move)
      down.left = Math.max(Math.min(eInZoom.left, eInZoom.width), 0)
    }
    if (top === maxTop || top === 0) {
      // 轉換拖曳點Y
      const eInZoom = this.eInZoom(move)
      down.top = Math.max(Math.min(eInZoom.top, eInZoom.height), 0)
    }
    return {
      left,
      top
    }
  },
  /* 縮放計算 */
  ratioPos: function (newRect) {
    /**
         * @argument e - moving event
         */
    const zoom = this.zoomPos()
    let xGrow = newRect.width - zoom.width
    let yGrow = newRect.height - zoom.height
    let horizon = xGrow > yGrow
    return {
      x: horizon,
      y: !horizon
    }
  },
  zoomingPosition: function ({ down, move }) {
    // 判斷移動方向
    let x = (move.clientX > down.clientX) ? 'r' : 'l'
    let y = (move.clientY > down.clientY) ? 'b' : 't'

    const getTop = () => this.eToArea(down, 'top')
    const getLeft = () => this.eToArea(down, 'left')

    const originTop = getTop()
    const originLeft = getLeft()

    const area = this.areaPos()
    let left, top, right, bottom
    let width = 0
    let height = 0
    let maxWidth, maxHeight
    const minWidth = this.minWidth * area.width / 100
    const minHeight = (this.ratio)
      ? minWidth / this.ratio
      : this.minHeight * area.height / 100
    // horizontal
    if (x === 'r') {
      if (originLeft + minWidth > area.width) {
        /* clip area will overlay, reset down position */
        down.clientX = area.right - minWidth
        left = originLeft
      } else {
        left = getLeft()
      }
      maxWidth = area.width - left
      width = move.clientX - down.clientX
    } else if (x === 'l') {
      if (originLeft < minWidth) {
        /* clip area will overlay, reset down position */
        down.clientX = area.left + minWidth
      }
      right = area.right - down.clientX
      maxWidth = area.width - right
      width = down.clientX - move.clientX
    }
    // vertical
    if (y === 'b') {
      if (originTop + minHeight > area.height) {
        down.clientY = area.bottom - minHeight
        top = originTop
      } else {
        top = getTop()
      }
      maxHeight = area.height - top
      height = move.clientY - down.clientY
    } else if (y === 't') {
      if (originTop < minHeight) {
        down.clientY = area.top + minHeight
      }
      bottom = area.bottom - down.clientY
      maxHeight = area.height - bottom
      height = down.clientY - move.clientY
    }

    width = Math.max(Math.min(width, maxWidth), minWidth)
    height = Math.max(Math.min(height, maxHeight), minHeight)

    return { width, height, top, left, right, bottom, maxWidth, maxHeight }
  },
  setRatioWH: function ({ width, height, maxWidth, maxHeight, left, top, right, bottom }) {
    if (!this.ratio) return { width, height, left, top, right, bottom }
    // 有設定比例的話進行調整
    const ratioPos = this.ratioPos({ width, height })
    if (ratioPos.x) {
      height = Math.min(width / this.ratio, maxHeight)
      width = (height === maxHeight) ? height * this.ratio : width
    } else {
      width = Math.min(height * this.ratio, maxWidth)
      height = (width === maxWidth) ? width / this.ratio : height
    }
    return { width, height, left, top, right, bottom }
  },
  initWHTL: function () {
    let width = this.initWidth
    let height = this.initHeight
    let left = (100 - this.initWidth) / 2
    let top = (100 - this.initHeight) / 2
    const area = this.areaPos()
    const pixel = {
      width: width * area.width / 100,
      height: height * area.height / 100,
      border: this.border * 2
    }
    if (!this.ratio) {
      if (width < this.minWidth) throw new Error('Invalid initWidth, minWidth combination')
      if (height < this.minHeight) throw new Error('Invalid initHeight, minHeight combination')
    } else if (this.ratio) {
      const wrapRatio = this.wrapRatio || this.imgRatio
      const calcH = () => {
        const heightInPixel = (pixel.width - pixel.border) / this.ratio + pixel.border
        const heightInPercentage = heightInPixel / area.height * 100
        height = Math.max(heightInPercentage, this.minHeight)
        top = (100 - height) / 2
      }
      const calcW = () => {
        const widthInPixel = (pixel.height - pixel.border) * this.ratio + pixel.border
        const widthInPercentage = widthInPixel / area.width * 100
        width = Math.max(widthInPercentage, this.minWidth)
        left = (100 - width) / 2
      }
      if (wrapRatio <= this.ratio) {
        calcH()
        if (this.minHeight === height) calcW()
        if (width > 100) throw new Error('Invalid ratio, wrapRatio, minWidth combination')
      } else {
        calcW()
        if (this.minWidth === width) calcH()
        if (height > 100) throw new Error('Invalid ratio, wrapRatio, minWidth combination')
      }
    }
    this.setTL$.next({ left, top })
    return { width, height }
  },
  splitPos: function ({ top, left, right, bottom, width, height, maxWidth, maxHeight }) {
    return {
      tl: { left, top, right, bottom },
      wh: { width, height, maxWidth, maxHeight }
    }
  },
  /* 拖曳縮放 */
  isZoomElement: function (e) {
    return this.zoomEl.contains(e.target) && e.target !== this.dragEl
  },
  judgeArea: function (e) {
    const zoom = this.zoomPos()
    const md = zoom.left + zoom.width / 2
    const vh = zoom.top + zoom.height / 2
    const mouseX = e.clientX
    const mouseY = e.clientY
    return {
      l: mouseX < md,
      r: mouseX > md,
      t: mouseY < vh,
      b: mouseY > vh
    }
  },
  setDownPosition: function (e) { // use in zoomWH$
    const judge = this.judgeArea(e)
    const zoom = this.zoomPos()
    const clientY = judge.t ? zoom.bottom : zoom.top
    const clientX = judge.l ? zoom.right : zoom.left

    return {
      target: null,
      clientX,
      clientY
    }
  },
  /* 兩指縮放 */
  isTwoPointZoomElement: function (e) {
    // in .area
    return (
      this.areaEl.contains(e.touches[0].target) &&
            this.areaEl.contains(e.touches[1].target)
    )
  },
  getTwoTouchesPos: function (start, move, originZoom) {
    /* p[0]----|
            |---- p[1]
        */
    const area = this.areaPos()
    const normalX = move.touches[0].clientX < move.touches[1].clientX
    const normalY = move.touches[0].clientY < move.touches[1].clientY
    const normalSX = start.touches[0].clientX < start.touches[1].clientX
    const normalSY = start.touches[0].clientY < start.touches[1].clientY
    // const originWRange = Math.abs(start.touches[0].clientX - start.touches[1].clientX),
    //     originHRange = Math.abs(start.touches[0].clientY - start.touches[1].clientY);
    const point = {
      left: (normalX) ? 0 : 1,
      right: (normalX) ? 1 : 0,
      top: (normalY) ? 0 : 1,
      bottom: (normalY) ? 1 : 0
    }
    const pointStart = {
      left: (normalSX) ? 0 : 1,
      right: (normalSX) ? 1 : 0,
      top: (normalSY) ? 0 : 1,
      bottom: (normalSY) ? 1 : 0
    }
    const LMove = start.touches[pointStart.left].clientX - move.touches[point.left].clientX
    const TMove = start.touches[pointStart.top].clientY - move.touches[point.top].clientY
    const minWidth = this.minWidth * area.width / 100
    const minHeight = (this.ratio)
      ? minWidth / this.ratio
      : this.minHeight * area.height / 100
    // 這裡的left,top要先validate否則maxWidth,maxHeight會算錯
    const left = Math.min(originZoom.left - area.left - LMove, area.width - minWidth)
    const top = Math.min(originZoom.top - area.top - TMove, area.height - minHeight)
    const maxWidth = area.width - left
    const maxHeight = area.height - top
    const overRight = (start.touches[pointStart.right].clientX - originZoom.right)
    const overTop = (start.touches[pointStart.bottom].clientY - originZoom.bottom)
    const width = Math.max(Math.min(move.touches[point.right].clientX - area.left - left - overRight, maxWidth), minWidth)
    const height = Math.max(Math.min(move.touches[point.bottom].clientY - top - area.top - overTop, maxHeight), minHeight)
    return { width, height, top, left, maxWidth, maxHeight }
  },
  /* 拖曳重新劃定區域 */
  isCreateElement: function (e) {
    return e.target === this.areaEl || e.target === this.imgEl
  },
  getFakeDown: function (e) {
    return {
      target: e.target,
      clientX: e.clientX,
      clientY: e.clientY
    }
  },
  reverseDownPos: function ({ down, move }) {
    if (this.mode === 'normal') return { down, move }

    if (down.target !== null && down.target === this.areaEl) { // this is dragCreate, first time dont count
      down.target = null
      return { down, move }
    }
    // 處理反向
    const judge = this.judgeArea(down)
    const zoom = this.zoomPos()
    // 左右反向
    if (judge.l && move.clientX <= down.clientX) {
      down.clientX = zoom.right
    } else if (judge.r && move.clientX >= down.clientX) {
      down.clientX = zoom.left
    }
    // 上下反向
    if (judge.t && move.clientY <= down.clientY) {
      down.clientY = zoom.bottom
    } else if (judge.b && move.clientY >= down.clientY) {
      down.clientY = zoom.top
    }
    return { down, move }
  },
  getImgNonRotatePos: function () {
    // 取得 image 旋轉前的 position
    const scalePos = this.scalePos()
    const x = scalePos.left + scalePos.width / 2
    const y = scalePos.top + scalePos.height / 2
    let w, h
    if (this.isVertical) {
      h = scalePos.height
      w = h * this.imgRatio
    } else {
      w = scalePos.width
      h = w / this.imgRatio
    }
    return {
      left: x - w / 2,
      right: x + w / 2,
      top: y - h / 2,
      bottom: y + h / 2,
      width: w,
      height: h
    }
  },
  // DRAW
  getDrawPos: function (opt) {
    const { wPixel, maxWPixel } = opt || {}
    const zoom = this.zoomPos()
    const img = this.getImgNonRotatePos()
    const imgW = this.imgEl.naturalWidth
    const viewW = img.width
    const viewL = zoom.left - img.left + this.border
    const viewT = zoom.top - img.top + this.border
    const zWidth = zoom.width - this.border * 2
    const zHeight = zoom.height - this.border * 2
    const rate = imgW / viewW
    const dWidth = (maxWPixel)
      ? Math.min((wPixel || zWidth * rate), maxWPixel)
      : wPixel || zWidth * rate
    const translate = {
      rotateX: (img.left + img.width / 2 - (zoom.left + this.border)) * rate,
      rotateY: (img.top + img.height / 2 - (zoom.top + this.border)) * rate,
      drawX: (img.left - (zoom.left + this.border)) * rate,
      drawY: (img.top - (zoom.top + this.border)) * rate
    }
    const pos = {
      sx: viewL * rate, // sx
      sy: viewT * rate, // sy
      swidth: zWidth * rate, // sWidth
      sheight: zHeight * rate, // sHeight
      dx: 0, // dx
      dy: 0, // dy
      dwidth: dWidth, // dWidth
      dheight: dWidth * zHeight / zWidth// dHeight
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
  }
}

export default clipperMethods
