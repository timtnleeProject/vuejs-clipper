<template>
  <div class="basic">
    <h1 class="text-h1 my-10">Clipper Basic</h1>
    <v-row>
      <v-col cols="12" sm="6">
        <div class="text-subtitle-1">Select Image</div>
        <gallary ref="gallary" @select="handleSelect"></gallary>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="text-subtitle-1">Action</div>
        <div class="d-flex">
          <clipper-upload @input="uploadImage" class="mr-1" accept="image/*" id="123">
            <v-btn color="secondary">upload Image</v-btn>
          </clipper-upload>
          <v-btn color="primary" @click="clipImage">Clip Image</v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row class="text-body-2">
      <v-col cols="12" sm="6">
        <clipper-basic
          ref="clipper"
          :src="src"
          :border="border"
          :outline="outline"
          :ratio="ratio"
          :corner="corner"
          :grid="grid"
          :wrap-ratio="wrapRatio"
          :rotate="rotate"
          :scale="scale"
          :bg-color="bg"
          :shadow="shadow"
          preview="preview"
        />
        <div class="text-subtitle-1">Preview</div>
        <v-row dense>
          <v-col cols="6">
            <clipper-preview name="preview" />
          </v-col>
          <v-col cols="4"><clipper-preview name="preview"/></v-col>
          <v-col cols="2"><clipper-preview name="preview"/></v-col>
        </v-row>
        <div class="text-subtitle-1">Code</div>
        <vue-code-highlight language="html">
          {{ this.sampleCode }}
        </vue-code-highlight>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="text-subtitle-1">Props</div>
        <v-row dense>
          <v-col>
            <v-text-field
              label="border"
              type="number"
              v-model.number="border"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="outline"
              type="number"
              v-model.number="outline"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-radio-group label="ratio" row v-model="ratio">
          <v-radio label="none" :value="0"></v-radio>
          <v-radio label="1" :value="1"></v-radio>
          <v-radio label="4/3" :value="4 / 3"></v-radio>
          <v-radio label="16/9" :value="16 / 9"></v-radio>
        </v-radio-group>
        <v-radio-group label="wrap-ratio" row v-model="wrapRatio">
          <v-radio label="none" :value="0"></v-radio>
          <v-radio label="1" :value="1"></v-radio>
          <v-radio label="4/3" :value="4 / 3"></v-radio>
          <v-radio label="16/9" :value="16 / 9"></v-radio>
        </v-radio-group>
        <v-row class="mb-6">
          <v-col>
            <v-checkbox v-model="corner" label="corner" hide-details></v-checkbox>
          </v-col>
          <v-col>
            <v-checkbox v-model="grid" label="grid" hide-details></v-checkbox>
          </v-col>
        </v-row>
        <v-slider
          label="rotate"
          v-model="rotate"
          min="-180"
          max="180"
          :thumb-size="24"
          thumb-label="always"
        >
          <template v-slot:thumb-label="{ value }">
            {{ value + "ﾟ" }}
          </template>
        </v-slider>
        <v-slider
          label="scale"
          v-model="scale"
          :min="0.5"
          :max="3"
          :step="0.02"
          :thumb-size="24"
          thumb-label="always"
        >
        </v-slider>
        <v-row>
          <v-col md="6">
            <div class="text-subtitle-1 label--text">bg-color</div>
            <v-color-picker v-model="bg" hide-inputs></v-color-picker>
          </v-col>
          <v-col md="6">
            <div class="text-subtitle-1 label--text">shadow</div>
            <v-color-picker v-model="shadow" hide-inputs></v-color-picker
          ></v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-overlay :value="overlay" :opacity="0.8">
      <div class="result-wrap">
        <v-row>
          <v-col>
            <div class="text-subtitle-1">Result Canvas</div>
            <canvas ref="canvas"></canvas>
          </v-col>
          <v-col>
            <div class="text-subtitle-1">Result Image</div>
            <img :src="resultSrc" alt="" />
          </v-col>
        </v-row>
        <div class="text-right">
          <v-btn @click="closeOverlay">Close</v-btn>
        </div>
      </div>
    </v-overlay>
  </div>
</template>

<script>
import pic from "@/assets/sea.jpg";
import Gallary from "@/components/Gallary";
import { component as VueCodeHighlight } from "vue-code-highlight";

export default {
  name: "Home",
  components: {
    Gallary,
    VueCodeHighlight
  },
  data: () => ({
    src: pic,
    border: 1,
    outline: 5,
    ratio: 0,
    corner: true,
    grid: true,
    wrapRatio: 0,
    rotate: 0,
    scale: 1,
    bg: "#ffffff",
    shadow: "#00000040",
    overlay: false,
    resultSrc: ""
  }),
  computed: {
    sampleCode() {
      return `<clipper-basic
  :src="${this.src}"
  :border="${this.border}"
  :outline="${this.outline}"
  :ratio="${this.ratio}"
  :corner="${this.corner}"
  :grid="${this.grid}"
  :wrap-ratio="${this.wrapRatio}"
  :rotate="${this.rotate}"
  :scale="${this.scale}"
  :bg-color="${this.bg}"
  :shadow="${this.shadow}"
/>`;
    }
  },
  methods: {
    uploadImage(domString) {
      this.src = domString;
    },
    handleSelect(src) {
      this.src = src;
    },
    clipImage() {
      this.overlay = true;
      this.$nextTick(() => {
        const canvas = this.$refs.clipper.clip();
        // this.$el.drawImage(canvas);
        const el = this.$refs.canvas;
        el.width = canvas.width;
        el.height = canvas.height;
        const context = el.getContext("2d");
        context.drawImage(canvas, 0, 0);
        this.resultSrc = canvas.toDataURL("image/png", 1); //to png
      });
    },
    closeOverlay() {
      this.overlay = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.result-wrap {
  width: 100vw;
  max-width: 600px;
  img,
  canvas {
    width: 100%;
  }
}
</style>
