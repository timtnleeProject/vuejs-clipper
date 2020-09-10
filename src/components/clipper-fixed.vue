<template>
  <div class="js-clipper-fixed">
    <div
      class="vuejs-clipper-fixed__wrap js-wrap"
      :style="wrapStyle"
    >
      <canvas
        class="vuejs-clipper-fixed__stem-outer"
        :width="stemArea.width"
        :height="stemArea.height"
      />
      <div class="vuejs-clipper-fixed__img-center">
        <canvas class="vuejs-clipper-fixed__stem-bg js-stem-bg" />
        <div
          class="vuejs-clipper-fixed__img-scale js-img-scale"
          :style="scaleStyle"
        >
          <div
            class="vuejs-clipper-fixed__img-translate js-img-translate"
            :style="translateStyle"
          >
            <img
              :src="src"
              class="vuejs-clipper-fixed__img js-img"
              :style="bgStyle"
              :crossorigin="crossOrigin"
              @load="imgLoaded(); emit('load',$event)"
              @error="emit('error',$event)"
            >
          </div>
        </div>
      </div>
      <div class="vuejs-clipper-fixed__cover">
        <div
          class="vuejs-clipper-fixed__area js-area"
          :style="areaStyle"
        >
          <canvas
            class="vuejs-clipper-fixed__stem-area"
            :width="stemArea.width"
            :height="stemArea.height"
            :style="stemStyle"
          />
          <div
            v-if="grid"
            class="vuejs-clipper-fixed__grid"
          >
            <div
              v-for="index in 4"
              :key="'gridItem'+index"
              class="vuejs-clipper-fixed__grid-item"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="vuejs-clipper-fixed__placeholder"
      :style="eptStyle"
    >
      <slot name="placeholder" />
    </div>
  </div>
</template>

<script>
import {
  fixedMethods,
  rxEventListeners,
  rxWheelListeners,
  pluginMethods
} from './extends/clippo'
import {
  map,
  tap,
  filter,
  startWith,
  concatMap,
  merge,
  takeUntil
} from 'rxjs/operators'
import { Subject, merge as mergeObs } from 'rxjs'
export default {
  extends: {
    methods: fixedMethods,
    mixins: [rxEventListeners, rxWheelListeners, pluginMethods]
  },
  subscriptions () {
    this.setWH$ = new Subject()
    this.setTL$ = new Subject()
    this.change$ = new Subject()
    /** basic */
    this.mousedownDrag$ = this.mousedown$.pipe(
      filter(this.isDragElement),
      tap(this.prevent),
      map(this.dragDownPos),
      concatMap(
        () => this.mousemove$.pipe(tap(this.prevent), takeUntil(this.mouseup$)),
        (down, move) => {
          return { down, move }
        }
      )
    )
    this.touchdownDrag$ = this.touchstart$.pipe(
      filter(this.isDragElement),
      tap(this.prevent),
      filter(e => e.touches.length === 1),
      map(e => e.touches[0]),
      map(this.dragDownPos),
      concatMap(
        () =>
          this.touchmove$.pipe(
            takeUntil(this.touchend$),
            filter(e => e.touches.length === 1)
          ),
        (down, move) => {
          return { down, move: move.touches[0] }
        }
      )
    )
    this.wheelEvent$ = this.wheel$.pipe(
      filter(this.isDragElement),
      tap(this.prevent),
      map(e => e.deltaY),
      map(deltaY => (deltaY >= 0 ? -1 : 1))
    )
    this.touchTwoFinger$ = this.touchstart$.pipe(
      filter(this.isDragElement),
      filter(e => e.touches.length === 2),
      tap(this.prevent),
      map(this.towPointsTouches),
      map(this.setOrigin),
      concatMap(
        () =>
          this.touchmove$.pipe(
            takeUntil(this.touchend$),
            filter(e => e.touches.length === 2),
            map(this.towPointsTouches)
          ),
        ({ down, origin }, move) => {
          return { down, move, origin }
        }
      ),
      map(this.twoPointsDelta)
    )
    /** Zoom Subject */
    this.wheelZoom$ = new Subject().pipe(
      startWith(1),
      merge(this.wheelEvent$),
      map(this.calcWheelScaling)
    )
    this.touchZoom$ = new Subject().pipe(
      startWith(1),
      merge(this.touchTwoFinger$),
      map(this.calcTouchScaling)
    )

    this.zoomFromNativeEvents = mergeObs(
      this.wheelZoom$,
      this.touchZoom$
    )
      .pipe(
        map(this.handleZoomEvent)
      )

    this.zoomSubject$ = new Subject().pipe(
      merge(this.setWH$),
      merge(this.zoomFromNativeEvents)
    )
    /** Drag Subject */
    this.dragSubject$ = new Subject().pipe(
      startWith({ left: 0, top: 0 }),
      merge(this.setTL$),
      merge(
        this.mousedownDrag$.pipe(
          merge(this.touchdownDrag$),
          map(this.delta),
          map(this.toPercentage)
        )
      )
    )

    this.onChange$ = new Subject().pipe(
      merge(this.zoomSubject$),
      merge(this.dragSubject$),
      merge(this.change$)
    )

    return {
      bgWH$: this.zoomSubject$,
      bgTL$: this.dragSubject$
    }
  },
  props: {
    src: {
      type: String,
      default: ''
    },
    rotate: {
      type: Number,
      default: 0
    },
    ratio: {
      type: Number,
      default: 1
    },
    zoomRate: {
      type: Number,
      default: 0.04
    },
    minScale: {
      type: Number,
      default: 0.1
    },
    bgColor: {
      type: String,
      default: 'white'
    },
    border: {
      type: Number,
      default: 1
    },
    borderColor: {
      type: String,
      default: 'white'
    },
    grid: {
      type: Boolean,
      default: true
    },
    shadow: {
      type: String,
      default: 'rgba(0, 0, 0, 0.4)'
    },
    round: {
      type: Boolean,
      default: false
    },
    preview: {
      type: String,
      default: ''
    },
    crossOrigin: {
      type: String,
      default: undefined
    },
    area: {
      type: Number,
      default: 50
    },
    handleZoomEvent: {
      type: Function,
      default: val => val
    }
  },
  data () {
    return {
      imgRatio: NaN
    }
  },
  computed: {
    areaStyle: function () {
      const style = {
        'color': this.shadow,
        'border-width': `${this.border}px !important`,
        'border-color': `${this.borderColor} !important`,
        'box-shadow': `0 0 0 ${this._shadow} !important`,
        'border-radius': `${(this.round) ? '50%' : ''} !important`
      }
      this.ratio >= 1 ? (style.width = `${this.area}% !important`) : (style.height = `${this.area}% !important`)
      return style
    },
    scaleStyle: function () {
      let width = this.bgWH$
      return {
        transform: `scale(${width}) !important`
      }
    },
    translateStyle: function () {
      let left = this.bgTL$.left
      let top = this.bgTL$.top
      return {
        transform: `translate(${left}%,${top}%) !important`
      }
    },
    bgStyle: function () {
      return {
        transform: `rotate(${this.rotate}deg) !important`
      }
    },
    wrapStyle: function () {
      return {
        'background-color': `${this.bgColor} !important`,
        'display': `${(this.src) ? 'block' : 'none'} !important`
      }
    },
    stemArea: function () {
      return {
        width: 100,
        height: 100 / this.ratio
      }
    },
    eptStyle: function () {
      return {
        display: `${(this.src) ? 'none' : 'block'} !important`
      }
    },
    stemStyle: function () {
      const style = {}
      this.ratio >= 1 ? (style.width = '100% !important') : (style.height = '100% !important')
      return style
    },
    _shadow: function () {
      return `${(this.imgRatio >= 1 ? 100 : 100 / this.imgRatio)}vw`
    }
  },
  watch: {
    ratio () {
      this.resetData()
      this.change$.next(0)
    },
    bgColor () {
      this.callPreview('setData', { bgColor: this.bgColor })
    },
    bgStyle () {
      this.change$.next(0)
    }
  },
  mounted () {
    this.imgEl = this.$el.querySelector('.js-clipper-fixed .js-img')
    this.wrapEl = this.$el.querySelector('.js-clipper-fixed .js-wrap')
    this.areaEl = this.$el.querySelector('.js-clipper-fixed .js-area')
    this.scaleEl = this.$el.querySelector('.js-clipper-fixed .js-img-scale')
    this.translateEl = this.$el.querySelector('.js-clipper-fixed .js-img-translate')
    this.stemEl = this.$el.querySelector('.js-clipper-fixed .js-stem-bg')
    this.canvasEl = document.createElement('CANVAS')
    this.$subscribeTo(
      this.onChange$,
      () => {
        this.$nextTick(() => {
          const result = this.getDrawPos().pos
          const rotate = this.rotate
          if (this.invalidDrawPos(result)) return
          this.callPreview('locateImage', result, rotate)
        })
      }
    )
  },
  methods: {
    imgLoaded: function () {
      this.imgRatio = this.imgEl.naturalWidth / this.imgEl.naturalHeight
      this.stemEl.width = this.imgEl.naturalWidth
      this.stemEl.height = this.imgEl.naturalHeight
      this.resetData()
      this.callPreview('setData', {
        src: this.src,
        bgColor: this.bgColor
      })
    },
    resetData: function () {
      this.setTL$.next({ left: 0, top: 0 })
      const scale = (this.ratio > this.imgRatio)
        ? this.imgRatio / this.ratio
        : 1
      this.setWH$.next(Math.max(scale, this.minScale))
    }
  }
}
</script>
<style lang='scss' scoped>
$grid-width: 1px;

.vuejs-clipper-fixed__wrap {
  position: relative !important;
  overflow: hidden !important;
  width: 100% !important;
  height: 100% !important;
  cursor: grab;
}
.vuejs-clipper-fixed__stem-outer {
  position: relative !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  display: block !important;
}
.vuejs-clipper-fixed__stem-bg {
  position: relative !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
}
.vuejs-clipper-fixed__img-center {
  width: 100% !important;
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
}
.vuejs-clipper-fixed__img-scale {
  position: absolute !important;
  top: 0% !important;
  left: 0% !important;
  width: 100% !important;
  height: 100% !important;
}
.vuejs-clipper-fixed__img-translate {
  position: absolute !important;
  top: 0% !important;
  left: 0% !important;
  width: 100% !important;
  height: 100% !important;
}
.vuejs-clipper-fixed__img {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  display: block !important;
}
.vuejs-clipper-fixed__cover {
  pointer-events: none !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  overflow: hidden !important;
}
.vuejs-clipper-fixed__area {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  border-style: solid;
}
.vuejs-clipper-fixed__stem-area {
  display: block !important;
  position: relative !important;
}
.vuejs-clipper-fixed__grid {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}
.vuejs-clipper-fixed__grid-item {
  position: absolute;
  border-color: rgba(255, 255, 255, 0.7);
  border-style: dashed;
  width: 50%;
  height: 50%;
  box-sizing: border-box;
}
.vuejs-clipper-fixed__grid-item:nth-child(1) {
  top: 0;
  left: 0;
  border-width: 0 $grid-width $grid-width 0;
  transform: translate($grid-width/2, $grid-width/2);
}
.vuejs-clipper-fixed__grid-item:nth-child(2) {
  top: 0;
  right: 0;
  border-width: 0 0 $grid-width 0;
  transform: translate(-$grid-width/2, $grid-width/2);
}
.vuejs-clipper-fixed__grid-item:nth-child(3) {
  bottom: 0;
  left: 0;
  border-width: 0 $grid-width 0 0;
  transform: translate($grid-width/2, -$grid-width/2);
}
.vuejs-clipper-fixed__grid-item:nth-child(4) {
  bottom: 0;
  right: 0;
  border-width: 0;
  transform: translate(-$grid-width/2, -$grid-width/2);
}
</style>
