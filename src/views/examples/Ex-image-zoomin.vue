<template>
    <div class="list-content content">
        <div class="area">
            <h2>Use as an image zoom-in component</h2>
            <p>You can use clipper-fixed as an image zoom-in component since version 0.2.9 has prop border-color.</p>
            <p>Set the border-color and shadow to transparent and disable the grid.</p>      
            <pre v-highlightjs="code.ex1"><code class="html"></code></pre>
            <clipper-fixed src="ex2.jpg" style="max-width:500px" shadow="transparent" border-color="transparent" bg-color="lightgray" :grid="false"></clipper-fixed>
        </div>
        <div class="area">
            <p>Now it act like an image zoom-in component.</p>
            <p><a href="https://timtnleeproject.github.io/blog/#/article/mongodb%20windows" target="_blank">Here</a> is an example, click the pictures in the article to see the effect.</p>
        </div>
    </div>
</template>

<script>
import { zoom as code } from '@/code.js';
import clipToURL from '@/clip.js'
export default {
  extends: {
    mixins: [clipToURL]
  },
  data: () => {
    return {
      src: 'ex1.jpg',
      clipResult: '',
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