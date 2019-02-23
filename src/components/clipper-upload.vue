<template>
  <div @click="triggerInput">
      <slot></slot>
      <img class="stem" :src="DomString" style="display:none">
      <input type="file" class="upload" :accept="accept" @change="upload($event)" @click="clear($event)" style="display:none">
  </div>    
</template>

<script>
import exif from "exif-js";

export default {
  mounted(){
    this.uploadEl = this.$el.querySelector('.upload')
  },
  props: {
    accept: {
      type: String,
      default: '*'
    },
    exif: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: ''
    },
    check: {
      type: Boolean,
      default: true
    }
  },
  data: ()=>{
    return {
      uploadEl: null,
      DomString: ''
    }
  },
  methods: {
    upload: function(e){
      if(e.target.files.length!==1) return;
      this.file = e.target.files[0];
      if (this.check && !this.file.type.startsWith('image/')) return;
      if(this.DomString && /^blob:/.test(this.DomString))
        window.URL.revokeObjectURL(this.DomString)
      this.DomString = window.URL.createObjectURL(this.file)
      this.checkEXIF().then(()=>{
        this.$emit('input', this.DomString)
      })
    },
    checkEXIF: function(){
      return new Promise((res,rej)=>{
        if (!this.exif) return rej()
        res()
      })
        .then(()=>this.getEXIF())
        .then(orientation=>this.getImageRect()
          .then(({width,height})=>{
            return Promise.resolve({
              width,
              height,
              orientation
            })
          })
          .catch(()=>Promise.reject()))
        .then(this.tranformCanvas)
        .catch(()=>Promise.resolve()) //just use catch to escape chains

    },
    getEXIF: function(){
      return new Promise((res,rej)=>{
        exif.getData(this.file,function(){
          const orientation = this.exifdata.Orientation
          if (orientation === undefined || orientation === 1) rej()
          res(orientation)
        })
      })
    },
    getImageRect: function() {
      return new Promise((res,rej)=>{
        const img = this.$el.querySelector('.stem')
        if (img.complete) return res({
          width: img.naturalWidth,
          height: img.naturalHeight
        })
        img.onload = function(){
          res({
            width: this.naturalWidth,
            height: this.naturalHeight
          })
        }
        img.onerror = function() {
          rej()
        }
      })
    },  
    tranformCanvas: function({width,height,orientation}) {
      /**This piece of code is referenced to 
       * https://stackoverflow.com/questions/20600800/js-client-side-exif-orientation-rotate-and-mirror-jpeg-images */
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext("2d");

      // set proper canvas dimensions before transform & export
      if (4 < orientation && orientation < 9) {
        canvas.width = height;
        canvas.height = width;
      } else {
        canvas.width = width;
        canvas.height = height;
      }
      // transform context before drawing image
      switch (orientation) {
      case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
      case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
      case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
      case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
      case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
      case 7: ctx.transform(0, -1, -1, 0, height, width); break;
      case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
      default: break;
      }

      ctx.drawImage(this.$el.querySelector('.stem'),0,0)
      this.DomString = canvas.toDataURL(this.file.type)
    },
    clear: function(e){
      e.target.value = null;
    },
    triggerInput: function(){
      if(this.uploadEl) this.uploadEl.click();
    }
  }
}
</script>
