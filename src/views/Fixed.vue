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
    <h2>clipper-fixed</h2>
    <div class="area">
      <ul>
        <li>Drag and scale image to clip.</li>
        <li>It is recommended to use it to clip image in a fixed ratio, as the profile picture.</li>
        <li>Scale and ratio are default features, and also support rotate.</li>
        <li>Its height is auto adjust by ratio, you can only set the width of this component.</li>
        <li style="color:blue">This demo using normal input to upload files so it won't transform EXIF image.</li>
      </ul>
    </div>
    
    <div class="flex-center">
      <div>
        <h4>demo</h4>
        <clipper-fixed 
          class="fixed-sample"
          ref="clipper"
          :src='imgUrl'
          :border='border' 
          :ratio = 'ratio'
          :rotate='rotate' 
          :grid='grid'
          :bgColor="bgColor" 
          :shadow="shadow"
          :round="round"
          preview="preview">
    </clipper-fixed>
      </div>
      <div class="settings">
        <h4>settings</h4>
        <button @click="clip" class="btn">clip image</button>
        <label for="upload" class="btn">upload image</label> 
        <input id="upload" type="file" @change="upload($event)" >
        <div class="flex">
          <div class="flex">
            <span class="label">border: </span>
            <span><input type="number" v-model.number="border"></span>
          </div>
        </div>
        <div class="flex">
          <span  class="label">layout: </span>
          <span><input type="checkbox" name="grid" v-model="grid">grid</span>
          <span><input type="checkbox" name="round" v-model="round">round</span>
        </div>
        <div class="flex">
          <span class="label">ratio: </span>
          <span><input type="radio" name="ratio" :value="1" v-model.number="ratio">1:1</span>
          <span><input type="radio" name="ratio" :value="4/3" v-model.number="ratio">4:3</span>
          <span><input type="radio" name="ratio" :value="16/9" v-model.number="ratio">16:9</span>
        </div>
        <div class="flex">
          <span class="label">bgColor: </span>
          <span><input type="radio" name="bgColor" value="#000000" v-model="bgColor"><span class="color-tick" style="background-color:#000000"></span></span>
          <span><input type="radio" name="bgColor" value="pink" v-model="bgColor"><span class="color-tick" style="background-color:pink"></span></span>
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
          <clipper-range class="range" :min="-180" :max="180" v-model="rotate"></clipper-range>
        </div>
      </div>
    </div>
    <div class="flex">
      <clipper-preview name="preview" class="preview preview-lg"></clipper-preview>
      <clipper-preview name="preview" class="preview preview-md"></clipper-preview>
      <clipper-preview name="preview" class="preview preview-sm"></clipper-preview>
    </div>
  </div>
</div>
</template>

<script>
import clipToURL from "@/clip.js";
import Loader from '@/components/Loader.vue'
export default {
  extends: {
    mixins: [clipToURL]
  },
  components: {
    Loader
  },
  data: () => {
    return {
      imgUrl: "lily.jpg",
      border: 1,
      ratio: 1,
      rotate: 0,
      grid: true,
      bgColor: "#000000",
      shadow: "rgba(0,0,0,0.4)",
      round: false,
      popup: false,
      done: false,
      clipResult: null,
      link: null,
      filename: "clip"
    };
  },
  methods: {
    upload: function($event) {
      if ($event.target.files.length !== 0) {
        this.imgUrl = window.URL.createObjectURL($event.target.files[0]);
      }
    },
    clip: function() {
      this.popup = true
      this.done = false
      this.clipResult = null
      this.clipToURL()
    },
  }
};
</script>

<style lang="scss" scoped>
input {
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

// input {
//   width: 50px;
// }

// span {
//   display: inline-block;
//   padding: 10px;
// }
// .flex-center {
//   margin-bottom: 10px;
// }
// #upload {
//   display: none;
// }
// .settings {
//   padding-left: 10px;
// }
// .fixed {
//   padding: 20px;
// }
// .preview {
//   flex-basis: 0;
// }
// .preview-lg {
//   flex-grow: 5;
// }
// .preview-md {
//   flex-grow: 3;
// }
// .preview-sm {
//   flex-grow: 2;
// }
</style>

