const code = {}
code.initapp = {}
code.initapp.html = `<div id="app">
  <clipper-basic class="my-clipper" src="example.jpg"></clipper-basic>
</div>`
code.initapp.js = `new Vue({
  el: '#app'
})`
code.initapp.css = `.my-clipper {
  width: 100%;
  max-width: 700px;
}`
code.upload = {}
code.upload.html =`<div id="app">
  <input type="file" @change="upload($event)">
  <clipper-basic class="my-clipper" :src="imgURL">
    <div class="placeholder" slot="placeholder">No image</div>
  </clipper-basic>
</div>`
code.upload.js =  `new Vue({
  el: '#app',
  data: {
    imgURL: ''
  },
  methods: {
    upload: function(e){
      if (e.target.files.length !== 0) {
        if(this.imgURL) URL.revokeObjectURL(this.imgURL)
        this.imgURL = window.URL.createObjectURL(e.target.files[0]);
      }
    }
  }
})`
code.upload.css =`.placeholder {
  text-align: center;
  padding: 20px;
  background-color: lightgray;
}`
code.upload2 = {}
code.upload2.html =`<div id="app">
  <clipper-upload v-model="imgURL">upload image</clipper-upload>
  <clipper-basic class="my-clipper" :src="imgURL">
    <div class="placeholder" slot="placeholder">No image</div>
  </clipper-basic>
</div>`
code.upload2.js =  `new Vue({
    el: '#app',
    data: {
      imgURL: ''
    }
})`
code.result = {}
code.result.html = `<button @click="getResult">clip image</button>
<clipper-basic class="my-clipper" ref="clipper" :src="imgURL">
    <div class="placeholder" slot="placeholder">No image</div>
</clipper-basic>
<div>
    <div>result:</div>
    <img class="result" :src="resultURL" alt="">
</div>`
code.result.js1 = `data: {
  imgURL: '',
  resultURL: ''
}`
code.result.js = `getResult: function () {
  const canvas = this.$refs.clipper.clip();//call component's clip method
  this.resultURL = canvas.toDataURL("image/jpg", 1);//canvas->image
}`
code.preview = {}
code.preview.html = `<clipper-basic 
  class="my-clipper" 
  ref="clipper" 
  :src="imgURL" 
  preview="my-preview" >
  <div class="placeholder" slot="placeholder">No image</div>
</clipper-basic>
<div>
  <div>preview:</div>
  <clipper-preview name="my-preview" class="my-clipper">
    <div class="placeholder" slot="placeholder">preview area</div>
  </clipper-preview>
</div>`
code.full = 
`<meta charset="utf-8">
<title>vuejs-clipper demo</title>
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script src="./vuejs-clipper.umd.js"></script>
<link rel="stylesheet" href="./vuejs-clipper.css">
<div id="app">
    <button>
      <clipper-upload v-model="imgURL">upload image</clipper-upload>
    </button>
    <button @click="getResult">clip image</button>
    <clipper-basic class="my-clipper" ref="clipper" :src="imgURL" preview="my-preview">
        <div class="placeholder" slot="placeholder">No image</div>
    </clipper-basic>
    <div>
        <div>preview:</div>
        <clipper-preview name="my-preview" class="my-clipper">
            <div class="placeholder" slot="placeholder">preview area</div>
        </clipper-preview>
    </div>
    <div>
        <div>result:</div>
        <img class="result" :src="resultURL" alt="">
    </div>
</div>
<script>
    new Vue({
        el: '#app',
        data: {
            imgURL: '',
            resultURL: ''
        },
        methods: {
            getResult: function () {
                const canvas = this.$refs.clipper.clip();//call component's clip method
                this.resultURL = canvas.toDataURL("image/jpg", 1);//canvas->image
            }
        }
    })
</script>
<style>
    .my-clipper {
        width: 100%;
        max-width: 700px;
    }

    .placeholder {
        text-align: center;
        padding: 20px;
        background-color: lightgray;
    }
</style>`
export { code }

const verti = {}

verti.html = `<clipper-basicref="clipper" 
  ref="clipper"
  @load="imgLoad" 
  :style="basicStyle" 
  src="long.jpg">
</clipper-basic>`
verti.js =`data: () => {
  return {
      maxWidth: 700,
      maxHeight: 500,
      based: 850
  };
},
methods: {
  imgLoad: function() {
      const imgRatio = this.$refs.clipper.imgRatio;
      if(imgRatio < 1) this.based =  this.maxHeight*imgRatio;
      else this.based = this.maxWidth;
  },
},
computed: {
  basicStyle : function() {
      return {
          maxWidth: this.based + 'px'
      }
  }
}`

export { verti }

const trans = {}

trans.const = `const canvas = this.$refs.clipper.clip();`
trans.durl = `const jpgURL = canvas.toDataURL("image/jpeg")//to jpg
const pngURL = canvas.toDataURL("image/png", 1)//to png`
trans.blob = `canvas.toBlob(function(blob) {
  //...
});`
trans.url = `const vm = this;
const canvas = this.$refs.clipper.clip();
canvas.toBlob(function(blob){
    if(vm.resultURL)
      URL.revokeObjectURL(vm.resultURL)
    vm.resultURL = URL.createObjectURL(blob)
})`
trans.urles6 = `this.$refs.clipper.clip().toBlob(blob=>{
  if(this.resultURL) URL.revokeObjectURL(this.resultURL)
  this.resultURL = URL.createObjectURL(blob)
})`
trans.reader = `const vm = this;
const canvas = this.$refs.clipper.clip();
canvas.toBlob(function(blob){
    const reader = new FileReader()
    reader.addEventListener('load' ,function(){
        vm.resultURL = this.result;
    })
    reader.readAsDataURL(blob);
})`
export { trans }