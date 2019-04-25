<template>
    <div class="list-content content">
        <div class="area">
            <h2>Transparent Background</h2>
            <p>To get an image with a transparent background,</p>
            <p>upload a png which has a transparent background,</p>
            <p>set clipper component's "bgColor" to transparent color.</p>
            <!-- <clipper-upload v-model="src">upload</clipper-upload> -->
            <clipper-fixed class="sample" ref="clipper" :src="src" bgColor="rgba(0,0,0,0)"></clipper-fixed>
            <button @click="clipToURL">clip to see the result.</button>
            <p>clip result will be put above here, you can see this is a transparent image.</p>
            <div class="imgCon">
                <div class="text">
                    <p>text,text,text,text,text,text,text,text,text,</p>
                    <p>text,text,text,text,text,text,text,text,text,</p>
                    <p>text,text,text,text,text,text,text,text,text,</p>
                    <p>text,text,text,text,text,text,text,text,text,</p>
                    <p>text,text,text,text,text,text,text,text,text,</p>
                    <p>text,text,text,text,text,text,text,text,text,</p>
                    <p>text,text,text,text,text,text,text,text,text,</p>
                    <p>text,text,text,text,text,text,text,text,text,</p>
                    <p>text,text,text,text,text,text,text,text,text,</p>
                    <p>text,text,text,text,text,text,text,text,text,</p>
                    <p>text,text,text,text,text,text,text,text,text,</p>
                    <p>text,text,text,text,text,text,text,text,text,</p>
                    <p>text,text,text,text,text,text,text,text,text,</p>
                </div>
                <img :src="clipResult" class="imgResult">
            </div>   
        </div>
    </div>
</template>

<script>
import clipToURL from '@/clip.js'
export default {
  extends: {
    mixins: [clipToURL]  
  },
  data: () =>{
    return {
      src: 'icon/smile.png',
      clipResult: '',
    }
  },
  methods: {
    // getResult: function(){
    //     this.$refs.clipper.clip().toBlob(blob=>{
    //         if(this.resultURL) URL.revokeObjectURL(this.resultURL)
    //         this.resultURL = URL.createObjectURL(blob)
    //     })
    // }
  }
}
</script>

<style lang="scss" scoped>
$px : 300px;
.sample {
    max-width: 500px;
}
.imgCon {
    position: relative;
    width: $px;
    height: $px;
    overflow: hidden;
}
.text {
    position: absolute;
    width: 100%;
}
.imgResult {
    position: absolute;
    width: $px;
    top: 0;
    left: 0;
}
</style>
