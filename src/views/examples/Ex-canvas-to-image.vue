<template>
    <div class="list-content content">
        <div class="area">
            <h2>Canvas to Image</h2>
            <p>Since clipper component's result is only a canvas element, you might want to transform canvas to image for more usages.</p>
            <p>There's many ways you can transform canvas to image (image URL), here are some examples.</p>      
        </div>
        <div class="area">
            <p>First we get the result (canvas) from clipping component, and save it as <i>const canvas</i></p>
            <pre v-highlightjs="code.const"><code class="javascript"></code></pre>
            <p>If you don't know how to get the result from from clipping component, see <router-link to="/examples/quick-start">quick start</router-link>.</p>
        </div>
        <div class="area">
            <h3>canvas.toDataURL</h3>
            <p>canvas to base64 encoded string, synchronous.</p>
            <pre v-highlightjs="code.durl"><code class="javascript"></code></pre>
        </div>
        <div class="area">
            <h3>canvas.toBlob</h3>
            <p><b>IE not supported.</b></p>
            <p>canvas to blob, asynchronous.</p>
            <pre v-highlightjs="code.blob"><code class="javascript"></code></pre>
            <h3>URL.createObjectURL</h3>
            <p>Blob to image url(DOMString), using URL.createObjectURL, synchronous.</p>
            <pre v-highlightjs="code.url"><code class="javascript"></code></pre>
            <p>simplified</p>
            <pre v-highlightjs="code.urles6"><code class="javascript"></code></pre>
            <h3>FileReader</h3>
            <p>Blob to image url(base64 encoded string), using FileReader, asynchronous.</p>
            <pre v-highlightjs="code.reader"><code class="javascript"></code></pre>
        </div>
        <div class="area">
            <p><button @click="clip">clip image</button></p>
            <p><img class="sample" :src="clipResult" alt=""></p>
            <clipper-fixed class="sample" ref="clipper" :src="src"></clipper-fixed>
        </div>
    </div>
</template>

<script>
import { trans as code } from "@/code.js";
import clipToURL from '@/clip.js'
export default {
  extends: {
    mixins: [clipToURL]
  },
  data: () => {
    return {
      src: "ex1.jpg",
      clipResult: "",
      code
    };
  },
  methods: {
    clip: function(){
      this.clipToURL()
    }
  }
};
</script>

<style lang="scss" scoped>
.sample {
  width: 100%;
  max-width: 500px;
}
</style>
