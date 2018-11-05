<template>
  <div class="home">
    <div class="content">
      <clipper-basic src="ex3.jpg" class="basic-dark" shadow="rgba(0,0,0,0.7)"></clipper-basic>
      <div class="area">
        <h2>Features</h2>
        <div class="tab">
          <ul>
          <li>Vue.js image clipping components using vue-rx.</li>
          <li>Add image clipping components to your vue application in nothing flat.</li>
          <li>Touch devices supported and fully responsive.</li>
        </ul>
        </div>
      </div>
      <div class="area">
        <h2>clipper-basic</h2>
        <div class="tab">
          <h4>PC</h4>
        <ul>
          <li>mouse<img src="icon/mouse.png" class="icon">: Drag & Zoom clipping area/Create new clipping area.</li>
        </ul>
        <h4>Mobile</h4>
        <ul>
          <li>touch<img src="icon/touch.png" class="icon">: Drag & Zoom clipping area/Create new clipping area.</li>
          <li>two fingers<img src="icon/twofinger.png" class="icon">: Zoom clipping area.</li>
        </ul>
        </div>
        <div class="flex2">
          <div><clipper-basic src="ex2.jpg" preview="ex1"></clipper-basic></div>
          <div>
            <clipper-preview name="ex1"></clipper-preview>
          </div>
        </div>
        <router-link to="/basic" class="tab">more clipper-basic example</router-link>
      </div>
      <div class="gap"></div>
      <div class="area">
        <h2>clipper-fixed (recommended for mobile)</h2>
        <div class="tab">
        <h4>PC</h4>
        <ul>
          <li>mouse<img src="icon/mouse.png" class="icon">: Drag image.</li>
          <li>mouse wheel<img src="icon/wheel.png" class="icon">: Zoom image.</li>
        </ul>
        <h4>Mobile</h4>
        <ul>
          <li>touch<img src="icon/touch.png" class="icon">: Drag image.</li>
          <li>two fingers<img src="icon/twofinger.png" class="icon">: Zoom image.</li>
        </ul>
        </div>
        <div class="flex2">
          <div>
            <clipper-fixed src="ex1.jpg" :rotate="ex2rotate" preview="ex2" bgColor="black"></clipper-fixed>
            <div class="tab pd">Let's rotate:</div>
            <clipper-range v-model="ex2rotate" :min="-180" :max="180" class="range"></clipper-range>
          </div>
          <div>
            <clipper-preview name="ex2" class="fixed-preview-lg"></clipper-preview>
            <clipper-preview name="ex2" class="fixed-preview-md"></clipper-preview>
          </div>
        </div>
        <div class="tab">
          <router-link to="/fixed">more clipper-fixed example</router-link>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home",
  components: {},
  data: () => {
    return {
      ex2rotate: 0
    };
  },
  methods: {}
};
</script>
<style lang="scss">
.gap {
  height: 5vh;
}
.area {
  margin-bottom: 30px;
  font-size: 1.1rem;
  & p {
    margin-bottom: 15px;
  }
  & .title {
    font-size: 1.1em;
  }
}
@media only screen and (max-width: 596px) {
  .area{
    font-size: 1rem;
  }
}
.fixed-preview-lg {
  width: 100%;
}
.fixed-preview-md {
  width: 50%;
}
.flex2 {
  display: flex;
  & > div {
    flex-basis: 0;
    margin: 10px;
  }
  & > div:first-child {
    flex-grow: 6;
  }
  & > div:last-child {
    flex-grow: 4;
  }
}
@media only screen and (max-width: 596px) {
  .flex2 {
    flex-wrap: wrap;
    & > div {
      flex-basis: 100%;
      flex-grow: 1;
      margin-bottom: 5px;
    }
  }
}
</style>

