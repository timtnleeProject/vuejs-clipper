<template>
    <div class="list-content content">
        <div class="area">
            <h2>Verticle images</h2>
            <p>Clipper-basic, which acts as an <i>image</i> element, will automatically set its height <b>based on width</b>.</p>
            <p>Clipper-basic will set its layout ratio same as the image.</p>
            <p>Clipper-fixed will set its layout ratio same as its “ratio” attribute.</p>
            <p>For example, you set both clipper-basic and clipper-fixed to have max-width 500 pixels, 
                upload an image which width and height are <u>4:3</u>, then clipper-basic will be <u>500 x 375</u>.</p>
            <p>Assume clipper-fixed has attribute ratio set to 1, then clipper-fixed will be <u>500 x 500</u>.</p>
            <p>This might not be a good idea for clipper-basic when uploading a verticle image if you upload an image which is 1:2, 
                clipper-basic will become <u>500 x 1000</u> that might ruin the layout of the page.
            </p>
            <h3>upload image</h3>
            <img class="pic" src="long.jpg">
            <h3>Clipper-fixed</h3>
            <p>Clipper-fixed will set its layout ratio same as its “ratio” attribute (default 1).</p>
            <clipper-fixed class="sample" src="long.jpg"></clipper-fixed>
            <h3>Clipper-basic</h3>
            <p>Clipper-basic will set its layout ratio same as the image.</p>
            <p>It becomes too long.</p>
            <clipper-basic class="sample" src="long.jpg"></clipper-basic>
            <p>To avoid this, just use clipper-fixed instead, or you need to do some extra work.</p>
        </div>
        <div class="area">
            <h2>Clipper-basic based on height</h2>
            <h3>implement load event</h3>
            <p>First add a <i>v-on</i> to clipper-basic's load event, and binding style to a style object.</p>
            <pre v-highlightjs="code.html"><code class="html"></code></pre>
            <p>then you can implement the load event if it's a verticle image, calc max-width based on your maxHeight, otherwise use maxWidth directly.</p>
            <pre v-highlightjs="code.js"><code class="javascript"></code></pre>
            <clipper-upload class="btn" v-model="src">upload image</clipper-upload>
            <clipper-basic ref="clipper" :style="basicStyle" @load="imgLoad" :src="src">
                <div slot="placeholder">No image</div>
            </clipper-basic>
        </div>
    </div>
</template>

<script>
import { verti as code } from "@/code.js";
export default {
   data: () => {
        return {
            code,
            src: 'long.jpg',
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
    }
};
</script>

<style lang="scss" scoped>
.sample{
    width: 100%;
    max-width: 500px;
}
.pic{
    height: 50vh;
    max-height: 300px;
}
</style>
