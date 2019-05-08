<template>
  <div class="preview">
    <div
      class="wrap"
      :style="wrapStyle"
    >
      <canvas
        class="shim"
        :width="outerWidth"
        :height="outerHeight"
      />
      <div
        class="img-pos"
        :style="styleObj"
      >
        <div
          class="img-rotate"
          :style="rotateStyle"
        >
          <img
            :src="src"
            class="img"
            @load="imgLoaded"
          >
        </div>
      </div>
    </div>
    <div
      class="placeholder"
      :style="eptStyle"
    >
      <slot name="placeholder" />
    </div>
  </div>
</template>

<script>
import np from '../namespace'
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data: () => {
    return {
      src: '',
      imgEl: null,
      imgWidth: 1,
      imgHeight: 1,
      outerWidth: 1,
      outerHeight: 1,
      bgColor: 'white',
      pos: {},
      rotate: 0
    }
  },
  computed: {
    styleObj: function () {
      const left = this.pos.sx / this.imgWidth
      const top = this.pos.sy / this.imgHeight
      const width = this.imgWidth / this.pos.swidth
      return {
        transform: `scale(${width}) translate(${left * -100}% ,${top * -100}%)`
      }
    },
    rotateStyle: function () {
      return {
        transform: `rotate(${this.rotate}deg)`
      }
    },
    wrapStyle: function () {
      const display = (this.src) ? 'block' : 'none'
      return {
        backgroundColor: this.bgColor,
        display
      }
    },
    eptStyle: function () {
      return { display: (this.src) ? 'none' : 'block' }
    }
  },
  mounted () {
    this.imgEl = this.$el.querySelector('.img')
    this.initListener()
  },
  methods: {
    initListener: function () {
      // set listener on parent
      const parent = this.$parent
      const parentPropName = np.parentPropName
      if (!parent[parentPropName]) parent[parentPropName] = {}
      if (!parent[parentPropName][this.name]) { parent[parentPropName][this.name] = [] }
      let listeners = parent[parentPropName][this.name]
      listeners.push(this)
    },
    setData: function (datasets) { // Called from outside
      for (let k in datasets) {
        this[k] = datasets[k]
      }
    },
    imgLoaded: function () {
      this.imgWidth = this.imgEl.naturalWidth
      this.imgHeight = this.imgEl.naturalHeight
    },
    locateImage: function (pos, rotate) {
      this.rotate = rotate
      this.outerWidth = pos.swidth
      this.outerHeight = pos.sheight
      this.pos = pos
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  position: relative;
  overflow: hidden;
}
.shim {
  display: block;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
}

.img-pos {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transform-origin: 0 0;
}
.img-rotate {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  transform-origin: 50% 50%;
}
.img {
  left: 0;
  top: 0;
  position: relative;
  width: 100%;
  display: block;
}
</style>
