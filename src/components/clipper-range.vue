<template>
  <div class="clipper-range">
    <div
      v-stream:mousedown="mousedown$"
      v-stream:touchstart="touchstart$"
      class="wrap"
    >
      <div class="stick" />
      <div
        class="bar"
        :style="barStyle"
      />
    </div>
  </div>
</template>

<script>
import { map, concatMap, takeUntil, startWith, merge } from 'rxjs/operators'
import { Subject, fromEvent } from 'rxjs'
export default {
  domStreams: ['mousedown$', 'touchstart$'],
  subscriptions () {
    this.init$ = new Subject()
    this.mouseup$ = fromEvent(window, 'mouseup')
    this.mousemove$ = fromEvent(window, 'mousemove')
    this.touchmove$ = fromEvent(window, 'touchmove', { passive: false })
    this.touchend$ = fromEvent(window, 'touchend', { passive: false })
    this.mouseEvent$ = this.mousedown$.pipe(
      map(e => {
        e.event.preventDefault()
        return e.event
      }),
      concatMap(() =>
        this.mousemove$.pipe(takeUntil(this.mouseup$), map(e => e.clientX))
      ),
      merge(this.mousedown$.pipe(map(e => e.event.clientX)))
    )
    this.touchEvent$ = this.touchstart$.pipe(
      map(e => {
        e.event.preventDefault()
        return e.event
      }),
      concatMap(() =>
        this.touchmove$.pipe(
          takeUntil(this.touchend$),
          map(e => e.touches[0].clientX)
        )
      ),
      merge(this.touchstart$.pipe(map(e => e.event.touches[0].clientX)))
    )
    this.dragSubject$ = new Subject().pipe(
      merge(this.mouseEvent$),
      merge(this.touchEvent$),
      map(this.getLeftPercent),
      startWith(0),
      merge(this.init$)
    )
    return {
      x$: this.dragSubject$
    }
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 10
    },
    min: {
      type: Number,
      default: 0
    }
  },
  computed: {
    barStyle: function () {
      return {
        left: `${this.x$ * 100}%`
      }
    },
    val: function () {
      const range = this.max - this.min
      const pos = this.getPos()
      const stickPos = pos.stickPos
      const maxLeft = pos.maxLeft
      return this.x$ * stickPos.width / maxLeft * range + this.min
    }
  },
  watch: {
    value: function () {
      this.initVal()
    }
  },
  mounted () {
    this.initVal()
    this.$subscribeTo(this.dragSubject$, () => {
      this.$emit('input', this.val)
    })
  },
  methods: {
    getPos: function () {
      const stickPos = this.$el.querySelector('.stick').getBoundingClientRect()
      const barPos = this.$el.querySelector('.bar').getBoundingClientRect()
      return {
        maxLeft: stickPos.width - barPos.width,
        stickPos,
        barPos
      }
    },
    getLeftPercent: function (x) {
      const stickPos = this.$el.querySelector('.stick').getBoundingClientRect()
      const barPos = this.$el.querySelector('.bar').getBoundingClientRect()
      const maxLeft = stickPos.width - barPos.width
      const left = Math.max(Math.min(x - stickPos.left, maxLeft), 0)
      return left / stickPos.width
    },
    initVal: function () {
      const range = this.max - this.min
      const percent = (this.value - this.min) / range
      const pos = this.getPos()
      this.init$.next(percent * pos.maxLeft / pos.stickPos.width)
    }
  }
}
</script>

<style lang='scss' scoped>
.clipper-range {
  box-sizing: border-box;
  padding: 10px;
}
.wrap {
  position: relative;
  height: 25px;
  width: 100%;
}
.stick {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: gray;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
.bar {
  position: absolute;
  cursor: pointer;
  width: 12px;
  height: 100%;
  background-color: white;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
}
</style>
