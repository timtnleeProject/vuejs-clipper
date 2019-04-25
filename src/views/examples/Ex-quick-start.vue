<template>
    <div class="list-content content">
        <div class="area">
            <h2>Quick Start</h2>
            <h3>First setup</h3>
            <div class="p">Use components after <a href="https://www.npmjs.com/package/vuejs-clipper" target="_blank">installation</a>.</div>
            <div class="tab">
                <div class="title">Html</div>
                <pre v-highlightjs="code.initapp.html"><code class="html"></code></pre>
                <div class="title">Js</div>
                <pre v-highlightjs="code.initapp.js"><code class="javascript"></code></pre>
                <div class="title">Css</div>
                <div>set clipper width</div>
                <pre v-highlightjs="code.initapp.css"><code class="css"></code></pre>
                <div class="title">Result</div>
                <clipper-basic class="my-clipper" src="ex1.jpg"></clipper-basic>
            </div>
        </div>
        <div class="area">
            <h3>Upload image</h3>
            <div>
                You can use clipper-upload directly or implement by yourself.
            </div>
            <h4>(1) implement by yourself</h4>
            <div class="tab">
                <div class="title">Html</div>
                <div>add a file input</div>
                <pre v-highlightjs="code.upload.html"><code class="html"></code></pre>
                <div class="title">Js</div>
                <div>tranfrom file to URL</div>
                <pre v-highlightjs="code.upload.js"><code class="javascript"></code></pre>
                <div class="title">Css</div>
                <pre v-highlightjs="code.upload.css"><code class="css"></code></pre>
            </div>
            <h4>(2) Use clipper-upload</h4>
            <div class="tab">
                <div class="title">Html</div>
                <div>add clipper-upload, bind data.</div>
                <pre v-highlightjs="code.upload2.html"><code class="html"></code></pre>
                <div class="title">Js</div>
                <pre v-highlightjs="code.upload2.js"><code class="javascript"></code></pre>
            </div>
            <div class="tab">
                <div class="title">Result (use clipper-upload)</div>
                <div class="btn">
                    <clipper-upload v-model="imgURL[0]">upload image</clipper-upload>
                </div>
                <clipper-basic class="my-clipper" :src="imgURL[0]">
                    <div class="placeholder" slot="placeholder">No image</div>
                </clipper-basic>
            </div>
        </div>
        <div class="area">
            <h3>Get clipping result</h3>
            <div class="tab">
                <div class="title">Html</div>
                <div>Add a button</div>
                <div>Set 'ref' to use component's methods.</div>
                <pre v-highlightjs="code.result.html"><code class="html"></code></pre>
                <div class="title">Js</div>
                <div>Add data</div>
                <pre v-highlightjs="code.result.js1"><code class="javascript"></code></pre>
                <div>Add getResult method</div>
                <pre v-highlightjs="code.result.js"><code class="javascript"></code></pre>
                <div class="title">Result</div>
                <div class="btn">
                    <clipper-upload v-model="imgURL[1]">upload image</clipper-upload>
                </div>
                <button class="btn" @click="getResult(1)">clip image</button>
                <clipper-basic class="my-clipper" :src="imgURL[1]" :ref="refs[1]">
                    <div class="placeholder" slot="placeholder">No image</div>
                </clipper-basic>
                <div>
                    <div>result:</div>
                    <img class="result" :src="resultURL[1]" alt="">
                </div>
                <div>There are many ways to transform canvas to URL,</div>
                <div>See more about <router-link to="/examples/canvas-to-image">canvas to image</router-link>.</div>
            </div>
        </div>
        <div class="area">
            <h3>Preview clipping result</h3>
            <div class="tab">
                <div class="title">Html</div>
                <div>Add clipper-preview component, set name.</div>
                <div>Add preview prop to clipper-basic that matches clipper-preview's name</div>
                <pre v-highlightjs="code.preview.html"><code class="html"></code></pre>
                <div class="title">Result</div>
                <div class="btn">
                    <clipper-upload v-model="imgURL[2]">upload image</clipper-upload>
                </div>
                <button class="btn" @click="getResult(2)">clip image</button>
                <clipper-basic 
                    class="my-clipper" 
                    :ref="refs[2]" 
                    :src="imgURL[2]" 
                    preview="my-preview" >
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
                    <img class="result" :src="resultURL[2]" alt="">
                </div>
            </div>
        </div>
        <div class="area">
            <h3>Full code</h3>
            <pre v-highlightjs="code.full"><code class="html"></code></pre>
        </div>
    </div>
</template>

<script>
import { code } from '@/code';
export default {
  data: () => {
    return {
      code,
      refs: ['clipper1', 'clipper2', 'clipper3'],
      imgURL: ['', '', ''],
      resultURL: ['', '', '']
    };
  },
  methods: {
    getResult: function(index) {
      const canvas = this.$refs[this.refs[index]].clip(); //call component's clip method
      this.$set(this.resultURL, index, canvas.toDataURL('image/jpg', 1)); //canvas->image
    }
  }
};
</script>

<style lang="scss" scoped>
.my-clipper, .result {
  width: 100%;
  max-width: 700px;
}

.placeholder {
  text-align: center;
  padding: 20px;
  background-color: lightgray;
}
</style>
