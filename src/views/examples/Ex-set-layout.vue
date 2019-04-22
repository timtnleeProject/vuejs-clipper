<template>
    <div class="list-content content">
        <div class="area">
            <h2>Set clipping components zooming position</h2>
            <p>You can programmatically set the position and size of the scalable/movable area in clipping components.</p>
            <h4>clipper-basic</h4>
            <p>These rxjs subjects are merged after operations that calculate the valid positions(top, left, width, height), so you need to make sure that your positions are valid by yourself. For example, setting width 100 to (%) and left to 10 (%) is not a valid position because the clipping area will flow over the component.</p>
            <h5>click buttons to set the position and sizing of the clipping area</h5>
            <div class="flex">
              <div class="flex pd" v-for="(p,index) in pos" :key="`btn-${index}`">
                <span class="label"><button @click="setBasicPos(p)">pos: {{p.tl}} size: {{p.wh}}</button></span>
              </div>
            </div>
            <div class="basic">
              <pre v-highlightjs="code.basicHtml"><code class="html"></code></pre>
              <pre v-highlightjs="code.basic"><code class="javascript"></code></pre>
              <clipper-basic ref="basic" src="ex2.jpg" :grid="false"></clipper-basic>
            </div>
        </div>
        <div class="area">
            <h4>clipper-fixed</h4>
            <p>You can also adjust clipper-fixed's images position and sizing.</p>
            <div class="flex">
              <div class="flex pd" v-for="(p,index) in posFixed" :key="`btn-${index}`">
                <span class="label"><button @click="setFixedPos(p)">translate({{p.tl.left}}%, {{p.tl.top}}%), scale({{p.wh}})</button></span>
              </div>
            </div>
            <div class="basic">
              <pre v-highlightjs="code.basicHtml"><code class="html"></code></pre>
              <pre v-highlightjs="code.fixed"><code class="javascript"></code></pre>
              <clipper-fixed ref="fixed" src="ex2.jpg"></clipper-fixed>
            </div>
        </div>
    </div>
</template>

<script>
import { pos as code } from "@/code.js";
export default {
  data: () => {
    return {
      src: "ex1.jpg",
      clipResult: "",
      code,
      pos: [{
        tl: {
          top: 25,
          left: 25
        },
        wh: {
          width: 50,
          height: 50
        }
      },{
        tl: {
          top: 0,
          left: 0
        },
        wh: {
          width: 100,
          height: 100
        }
      },{
        tl: {
          right: 0,
          bottom: 0
        },
        wh: {
          width: 40,
          height: 30
        }
      },{
        tl: {
          leftt: 0,
          bottom: 20
        },
        wh: {
          width: 40,
          height: 30
        }
      }],
      posFixed: [{
        tl: {
          top: 0,
          left: 0
        },
        wh: 1
      },{
        tl: {
          top: 50,
          left: 50
        },
        wh: 0.6
      },{
        tl: {
          left: 10,
          top: 10
        },
        wh: 2
      }]
    };
  },
  methods: {
    clip: function(){
      this.clipToURL()
    },
    setBasicPos: function(p) {
      const ref = this.$refs.basic
      if (!ref) return
      ref.setTL$.next(p.tl)
      ref.setWH$.next(p.wh)
      this.$set(this.code, 'basic', `this.$refs.clipper.setTL$.next(${JSON.stringify(p.tl)})
this.$refs.clipper.setWH$.next(${JSON.stringify(p.wh)})`)
    },
    setFixedPos: function(p) {
      const ref = this.$refs.fixed
      if (!ref) return
      ref.setTL$.next(p.tl)
      ref.setWH$.next(p.wh)
      this.$set(this.code, 'fixed', `this.$refs.clipper.setTL$.next(${JSON.stringify(p.tl)})
this.$refs.clipper.setWH$.next(${JSON.stringify(p.wh)})`)
    }
  },
  computed: {
    position: function() {
      return Object.assign(this.pos, {
        right: 100 - this.pos.width - this.pos.left,
        bottom: 100 - this.pos.height - this.pos.top
      })
    },
    posBasic: function() {
      const ref = this.$refs.basic
      const digit = 2
      const str = {
        top: this.position.top.toFixed(digit),
        left: this.position.left.toFixed(digit),
        width: this.position.width.toFixed(digit),
        height: this.position.height.toFixed(digit)
      }
      this.setBasicPos()
      return str
    }
  }
};
</script>

<style lang="scss" scoped>
.sample {
  width: 100%;
  max-width: 500px;
}
.pd {
  padding: 5px;
}
.basic {
  width: 100%;
  max-width: 600px;
}
</style>