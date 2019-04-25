<template>
<div>
    <div class="popup" v-if="popup">
        <div class="popup-content">
            <div class="flow">
            <loader :done="done">Converting</loader>
            <img :src="clipResult" class="img">
            <div class="flex-center">
                <div class="flex-center">
                    <input type="text" v-model="filename">
                    <span>.png</span>
                </div>
            </div>
            <div class="flex-center">
                <button class="btn g"><a :href="link" :download="filename">download</a></button>
                <button class="btn r" @click="()=>{this.popup = false}">close</button>
            </div>
            </div>
            <img src="icon/cancel.png" alt="" class="close" @click="()=>{this.popup = false}">
        </div>
    </div>
    <div class="content">
        <h2>clipper-basic</h2>
        <div class="area">
            <ul>
                <li>Zoom and drag clipping area to clip the image.</li>
                <li>It is recommended to use it to clip image without ratio.</li>
                <li>Supported rotate, scale and ratio but they do not default features.</li>
            </ul>
        </div>
        <h3>gallary</h3>
        <gallary :gallary="gallary" v-model="imgUrl"></gallary>
        <h4>demo</h4>
        <clipper-basic class="basic-sample" ref="clipper" :style="basicStyle" @load="imgLoad" :src="imgUrl" :outline="outline||0" :border="border" :rotate="rotate" :ratio="ratio" :scale="scale" :corner="corner" :grid="grid" :bgColor="bgColor" :shadow="shadow" :mode="mode" preview="my-preview">
            <div slot="placeholder">No image uploaded</div>
        </clipper-basic>
        <div class="flex-center">
            <div class="settings">
                <h4>settings</h4>
                <div class="flex">
                    <button @click="clip" class="btn">clip image</button>
                    <div>
                      <clipper-upload class="btn" v-model="imgUrl">upload image</clipper-upload>
                    </div>
                </div>
                    <div class="flex">
                        <div class="flex">
                            <span class="label">outline</span>
                            <span><input v-model.number="outline" type="number" min="1"></span>
                        </div>
                            <div class="flex">
                                <span  class="label">border</span>
                                <span><input v-model.number="border" type="number" min="1"></span>
                            </div>
                            </div>
                            <div class="flex">
                                <span  class="label">layout: </span>
                                <span><input type="checkbox" name="corner" v-model="corner">corner</span>
                                <span><input type="checkbox" name="grid" v-model="grid">grid</span>
                            </div>
                            <div class="flex">
                                <span class="label">ratio: </span>
                                <span><input type="radio" name="ratio" :value="0" v-model.number="ratio">no ratio</span>
                                <span><input type="radio" name="ratio" :value="1" v-model.number="ratio">1:1</span>
                                <span><input type="radio" name="ratio" :value="4/3" v-model.number="ratio">4:3</span>
                                <span><input type="radio" name="ratio" :value="16/9" v-model.number="ratio">16:9</span>
                            </div>
                            <div class="flex">
                                <span class="label">mode: </span>
                                <span><input type="radio" name="mode" value="normal" v-model="mode">normal</span>
                                <span><input type="radio" name="mode" value="switch" v-model="mode">switch</span>
                            </div>
                            <div class="flex">
                                <span class="label">bgColor: </span>
                                <span><input type="radio" name="bgColor" value="#000000" v-model="bgColor"><span class="color-tick" style="background-color:#000000"></span></span>
                                <span><input type="radio" name="bgColor" value="#d8adad" v-model="bgColor"><span class="color-tick" style="background-color:#d8adad"></span></span>
                                <span><input type="radio" name="bgColor" value="#a1cfea" v-model="bgColor"><span class="color-tick" style="background-color:#a1cfea"></span></span>
                                <span><input type="radio" name="bgColor" value="#bc1229" v-model="bgColor"><span class="color-tick" style="background-color:#bc1229"></span></span>
                            </div>
                            <div class="flex">
                                <span class="label">shadow: </span>
                                <span><input type="radio" name="shadow" value="rgba(0,0,0,0.4)" v-model="shadow"><span class="shadow-tick" style="background-color:rgba(0,0,0,0.4)"></span></span>
                                <span><input type="radio" name="shadow" value="rgba(0,0,0,0.8)" v-model="shadow"><span class="shadow-tick" style="background-color:rgba(0,0,0,0.8)"></span></span>
                                <span><input type="radio" name="shadow" value="rgba(255,255,255,0.2)" v-model="shadow"><span class="shadow-tick" style="background-color:rgba(255,255,255,0.2)"></span></span>
                                <span><input type="radio" name="shadow" value="rgb(27, 170, 232,0.5)" v-model="shadow"><span class="shadow-tick" style="background-color:rgb(27, 170, 232,0.5)"></span></span>
                            </div>
                            <div class="flex">
                                <span class="w80 label">rotate: </span>
                                <clipper-range class="range" :min="0" :max="360" v-model="rotate"></clipper-range>
                            </div>
                            <div class="flex">
                                <span class="w80 label">scale: </span>
                                <clipper-range class="range" :min="0.2" :max="4" v-model="scale"></clipper-range>
                            </div>
                        </div>
                        <div class="previews">
                            <h4>preview</h4>
                            <div class="img-grid">
                                <clipper-preview class="preview preview-lg" name="my-preview"></clipper-preview>
                                <clipper-preview class="preview preview-md" name="my-preview"></clipper-preview>
                                <clipper-preview class="preview preview-sm" name="my-preview"></clipper-preview>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</template>

<script>
import clipToURL from '@/clip.js';
import Gallary from '@/components/Gallary.vue';
export default {
  components: {
    Gallary
  },
  extends: {
    mixins: [clipToURL]
  },
  data: () => {
    return {
      imgUrl: 'dawn.jpg',
      popup: false,
      ratio: 0,
      rotate: 0,
      scale: 1,
      outline: 10,
      border: 1,
      mode: 'normal',
      bgColor: '#000000',
      shadow: 'rgba(0,0,0,0.4)',
      corner: true,
      grid: true,
      clipResult: null,
      link: null,
      filename: 'clip',
      done: false,
      maxWidth: 850,
      gallary: ['dawn.jpg','long.jpg','ex1.jpg','profile.png']
    };
  },
  methods: {
    clip: function() {
      this.popup = true;
      this.done = false;
      this.clipResult = null;
      this.clipToURL();
    },
    imgLoad: function() {
      const maxHeight = 500;
      const imgRatio = this.$refs.clipper.imgRatio;
      if (imgRatio < 1) this.maxWidth = maxHeight * imgRatio;
      else this.maxWidth = 700;
      if (!this.gallary.find(g=>g===this.imgUrl))
        this.gallary.push(this.imgUrl)
    }
  },
  computed: {
    basicStyle: function() {
      return {
        maxWidth: this.maxWidth + 'px'
      };
    }
  }
};
</script>

<style lang="scss" scoped>
input {
  margin-left: 3px;
  width: 50px;
}

.flex > span {
  display: inline-block;
  padding: 10px;
}

#upload {
  display: none;
}

.preview-lg {
  width: 100%;
  max-width: 500px;
}

.preview-md {
  width: 200px;
}

.preview-sm {
  width: 100px;
}

.basic-sample {
  width: 100%;
}
</style>
