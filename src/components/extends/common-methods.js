const commonMethods = {
  /* 通用 common */
  prevent: function (e) {
    e.preventDefault()
  },
  eTo: function (e, direction, element) {
    const area = this[element + 'Pos']()
    let length = 0
    switch (direction) {
      case 'top':
        length = e.clientY - area.top
        break
      case 'left':
        length = e.clientX - area.left
        break
      case 'right':
        length = area.right - e.clientX
        break
      case 'bottom':
        length = area.bottom - e.clientY
        break
    }
    return length
  },
  toPercentage: function (pos) {
    const result = {}
    const table = {
      left: 'toX',
      right: 'toX',
      top: 'toY',
      bottom: 'toY',
      width: 'toX',
      height: 'toY'
    }
    for (let k in pos) {
      const fn = table[k]
      if (!fn || pos[k] === undefined) continue
      result[k] = this[fn](pos[k])
    }
    return result
  },
  invalidDrawPos: function (pos) { // true if invalid
    return (pos.swidth === 0 || pos.sheight === 0)
  }
}

export default commonMethods
