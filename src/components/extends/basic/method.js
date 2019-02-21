const clipperMethods = {
  eToArea: function (e, direction) {
    return this.eTo(e, direction, 'area');
  },
  areaPos: function () {
    const rect = this.areaEl.getBoundingClientRect();
    return rect
  },
  zoomPos: function () {
    const rect = this.zoomEl.getBoundingClientRect();
    return rect
  },
  eInZoom: function (e) {
    const zoomPos = this.zoomEl.getBoundingClientRect();
    return {
      width: zoomPos.width,
      height: zoomPos.height,
      left: e.clientX - zoomPos.left,
      top: e.clientY - zoomPos.top,
    }
  },
  zoomInArea: function () { //zoom rect & zoom pos related to area
    const areaPos = this.areaEl.getBoundingClientRect();
    const zoomPos = this.zoomEl.getBoundingClientRect();
    return Object.assign(zoomPos, {
      offsetLeft: zoomPos.left - areaPos.left,
      offsetTop: zoomPos.top - areaPos.top,
      maxLeft: areaPos.width - zoomPos.width,
      maxTop: areaPos.height - zoomPos.height
    })
  },
  toX: function (value) { //to X axis percentage 0~100 !
    const area = this.areaPos();
    return Math.min(Math.max(value / (area.width) * 100, 0), 100);
  },
  toY: function (value) {// to Y axis percentage 0~100 !
    const area = this.areaPos();
    return Math.min(Math.max(value / (area.height) * 100, 0), 100);
  },
  /* 拖曳drag */
  isDragElement: function (e) {
    return e.target === this.$el.querySelector('.drag-inset')
  },
  dragMoving: function ({ down, move }) {
    const left = this.toX(this.eToArea(move, "left") - down.left),
      top = this.toY(this.eToArea(move, "top") - down.top);
    //set max position
    return { left, top, down, move }
  },
  repositionDrag: function ({ left, top, down, move }) {//validate @left, @top, and reposition @down if nedded.
    const zoom = this.zoomInArea();
    const maxLeft = this.toX(zoom.maxLeft);
    const maxTop = this.toY(zoom.maxTop);
    left = Math.min(left, maxLeft);
    top = Math.min(top, maxTop);
    if (left === maxLeft || left === 0) {
      //轉換拖曳點X
      const eInZoom = this.eInZoom(move);
      down.left = Math.max(Math.min(eInZoom.left, eInZoom.width), 0);
    }
    if (top === maxTop || top === 0) {
      //轉換拖曳點Y
      const eInZoom = this.eInZoom(move);
      down.top = Math.max(Math.min(eInZoom.top, eInZoom.height), 0);
    }
    return {
      left,
      top
    };
  },
  /* 縮放計算*/
  ratioPos: function (newRect) {
    /**
         * @argument e - moving event
         */
    const zoom = this.zoomPos();
    let xGrow = newRect.width - zoom.width,
      yGrow = newRect.height - zoom.height,
      horizon = xGrow > yGrow;
    return {
      x: horizon,
      y: !horizon
    }

  },
  zoomingPosition: function (down, move) {
    /**
         * @augments down: zoomPos when click down,
         * @argument move: moving event
         */
    const area = this.areaPos();
    let left, top, right, bottom, width, height;
    let maxWidth, maxHeight;
    if (down.r === true) {
      left = down.offsetLeft;
      maxWidth = area.width - left;
      width = move.clientX - down.left;
    }
    if (down.l === true) {
      right = area.right - down.right;
      maxWidth = area.width - right;
      width = down.right - move.clientX;
    }
    if (down.b === true) {// zoom right&bottom
      top = down.offsetTop;
      //calc new pos
      maxHeight = area.height - top;
      height = move.clientY - down.top;
    }
    if (down.t === true) {
      bottom = area.bottom - down.bottom;
      maxHeight = area.height - bottom;
      height = down.bottom - move.clientY;
    }

    width = Math.min(width, maxWidth);
    height = Math.min(height, maxHeight);

    return { width, height, top, left, right, bottom, maxWidth, maxHeight };
  },
  $set_minWH: function (wh) {
    /**
         * @argument wh percentage {width, height}
         */
    return {
      width: Math.max(wh.width, 1),
      height: Math.max(wh.height, 1)
    }
  },
  $set_ratioWH: function ({ width, height, maxWidth, maxHeight }) {
    if (!this.ratio) return { width, height };
    //有設定比例的話進行調整
    const ratioPos = this.ratioPos({ width, height });
    if (ratioPos.x) {
      height = Math.min(width / this.ratio, maxHeight);
      width = (height === maxHeight) ? height * this.ratio : width;
    } else {
      width = Math.min(height * this.ratio, maxWidth);
      height = (width === maxWidth) ? width / this.ratio : height;
    }
    return { width, height }
  },
  $set_initWHTL: function () {
    let width = 50, height = 50,left, top;
    if (this.ratio) {
      if(this.ratio > this.imgRatio) 
        height = width/this.ratio*this.imgRatio
      else
        width = height*this.ratio/this.imgRatio
    }
    left = (100-width)/2;
    top = (100-height)/2;
    this.setTL$.next({ left, top });
    return { width, height }
  },
  splitPos: function ({ top, left, right, bottom, width, height, maxWidth, maxHeight }) {
    /* @pos: {
            left || right,  top || bottom, width, height
          } */
    return {
      tl: { left, top, right, bottom },
      wh: { width, height, maxWidth, maxHeight },
    };
  },
  /* 拖曳縮放 */
  isZoomElement: function (e) {
    return this.zoomEl.contains(e.target) && e.target != this.$el.querySelector('.drag-inset')
  },
  judgeArea: function (e) {
    const zoom = this.zoomPos();
    const md = zoom.left + zoom.width / 2,
      vh = zoom.top + zoom.height / 2,
      mouseX = e.clientX,
      mouseY = e.clientY;
    return {
      l: mouseX < md,
      r: mouseX > md,
      t: mouseY < vh,
      b: mouseY > vh,
    }
  },
  setDownPosition: function (e) {//use in zoomWH$
    const judge = this.judgeArea(e);
    const zoom = this.zoomPos();
    const clientY = judge.t ? zoom.bottom : zoom.top;
    const clientX = judge.l ? zoom.right : zoom.left;

    return {
      target: null,
      clientX,
      clientY
    };
  },
  /* 兩指縮放 */
  isTwoPointZoomElement: function (e) {
    //in .area
    return (
      this.areaEl.contains(e.touches[0].target) &&
            this.areaEl.contains(e.touches[1].target)
    );
  },
  getTwoTouchesPos: function (start, move, originZoom) {
    /* p[0]----| 
            |---- p[1]
        */
    const area = this.areaPos();
    const normalX = move.touches[0].clientX < move.touches[1].clientX;
    const normalY = move.touches[0].clientY < move.touches[1].clientY;
    const normalSX = start.touches[0].clientX < start.touches[1].clientX;
    const normalSY = start.touches[0].clientY < start.touches[1].clientY;
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
    const LMove = start.touches[pointStart.left].clientX - move.touches[point.left].clientX;
    const TMove = start.touches[pointStart.top].clientY - move.touches[point.top].clientY;
    //這裡的left,top要先validate否則maxWidth,maxHeight會算錯
    const left = Math.max(originZoom.left - area.left - LMove, 0);
    const top = Math.max(originZoom.top - area.top - TMove, 0);
    const maxWidth = area.width - left;
    const maxHeight = area.height - top;
    const overRight = (start.touches[pointStart.right].clientX - originZoom.right);
    const overTop = (start.touches[pointStart.bottom].clientY - originZoom.bottom)
    const width = Math.min(move.touches[point.right].clientX - area.left - left - overRight, maxWidth);
    const height = Math.min(move.touches[point.bottom].clientY - top - area.top - overTop, maxHeight);
    return { width, height, top, left, maxWidth, maxHeight }
  },
  /* 拖曳重新劃定區域 */
  isCreateElement: function (e) {
    return e.target === this.$el.querySelector(".clip-area") || e.target === this.$el.querySelector(".img")
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

    if (down.target !== null && down.target === this.$el.querySelector(".img")) { //this is dragCreate, first time dont count
      down.target = null;
      return { down, move }
    }
    //處理反向
    const judge = this.judgeArea(down);
    const zoom = this.zoomPos();
    //左右反向
    if (judge.l && move.clientX < down.clientX) {
      down.clientX = zoom.right
    } else if (judge.r && move.clientX > down.clientX) {
      down.clientX = zoom.left
    }
    //上下反向
    if (judge.t && move.clientY < down.clientY) {
      down.clientY = zoom.bottom;
    } else if (judge.b && move.clientY > down.clientY) {
      down.clientY = zoom.top;
    }
    return { down, move }
  },
  getCreatePos: function (down, move) {
    //判斷移動方向
    let x = (move.clientX > down.clientX) ? 'r' : 'l';
    let y = (move.clientY > down.clientY) ? 'b' : 't';

    const pos = {
      top: down.clientY,
      right: down.clientX,
      bottom: down.clientY,
      left: down.clientX,
      offsetTop: this.eToArea(down, 'top'),
      offsetLeft: this.eToArea(down, 'left'),
    }
    pos[x] = true;
    pos[y] = true;

    return pos;
  },
  //DRAW
  getDrawPos: function () {
    const zoom = this.zoomPos(),
      img = this.scaleEl.getBoundingClientRect();
    const imgW = this.imgEl.naturalWidth;
    const viewW = img.width,
      viewL = zoom.left - img.left + this.border,
      viewT = zoom.top - img.top + this.border,
      zWidth = zoom.width - this.border * 2,
      zHeight = zoom.height - this.border * 2;
    const rate = imgW / viewW;
    const translate = {
      rotateX: (img.left + img.width / 2 - (zoom.left + this.border)) * rate,
      rotateY: (img.top + img.height / 2 - (zoom.top + this.border)) * rate,
      drawX: (img.left - (zoom.left + this.border)) * rate,
      drawY: (img.top - (zoom.top + this.border)) * rate,
    }

    // const translate = {
    //     x: (img.left - (zoom.left+this.border))*rate,
    //     y: (img.top - (zoom.top+this.border))*rate
    // }
    const pos = {
      sx: viewL * rate,//sx
      sy: viewT * rate,//sy
      swidth: zWidth * rate,//sWidth
      sheight: zHeight * rate,//sHeight
      dx: 0,//dx
      dy: 0,//dy
      dwidth: zWidth * rate,//dWidth
      dheight: zHeight * rate//dHeight
    }
    pos[Symbol.iterator] = function* () {
      for (let k in pos) {
        yield pos[k]
      }
    };
    return {
      pos,
      translate
    };
  },
}

export default clipperMethods