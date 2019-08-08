<template>
  <div class="list-content content">
    <div class="area">
      <h2>Set pixel of result canvas/image</h2>
      <p>
        Detail: <a target="_blank" href="https://github.com/timtnleeProject/vuejs-clipper/wiki/Resulting-canvas-size">Resulting-canvas-size</a>
      </p>
      <div class="basic">
        <clipper-basic
          src="ex1.jpg"
          ref="clipper"
        ></clipper-basic>
        <div>
          <pre v-highlightjs="code.script"><code class="javascript"></code></pre>
        </div>
        <div class="flex margin">
          <span class="w80 label">wPixel</span>
          <input type="number" v-model="wPixel">
        </div>
        <button class="btn btn-block" @click="clip">get result</button>
      </div>
      <h3>Result:</h3>
      <div>
        {{ w }} {{ (w) ? 'x' : '' }} {{ h }}
      </div>
      <img :src="resultURI" alt="">
    </div>
  </div>
</template>

<script>
import { pixel as code } from '@/code';
export default {
  data () {
    return {
      code,
      resultURI: '',
      w: 0,
      h: 0,
      wPixel: 500
    }
  },
  methods: {
    clip () {
      const canvas = this.$refs.clipper.clip({ wPixel: this.wPixel })
      this.w = canvas.width
      this.h = canvas.height
      this.resultURI = canvas.toDataURL('image/jpeg')
    }
  }
}
</script>

<style lang="scss" scoped>
.basic {
  max-width: 750px;
}
.margin {
  margin: 5px 0px;
}
</style>
