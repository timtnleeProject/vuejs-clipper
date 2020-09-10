<template>
  <div class="home">
    <h1 class="text-h1 text-center my-10">Vuejs Clipper</h1>
    <h1 class="text-h5 text-center my-5">Playground &amp; Examples</h1>
    <div class="d-flex justify-center">
      <v-btn class="mr-2" color="primary"
        >Quick Start <v-icon small>mdi-clock-fast</v-icon></v-btn
      >
      <v-btn color="success" @click="gotoDocument"
        >Document <v-icon small>mdi-file</v-icon></v-btn
      >
    </div>
    <h2 class="text-h2 mt-10 mb-5">clipper-basic</h2>
    <v-row>
      <v-col cols="12" sm="6">
        <div class="text-subtitle mb-3">Component</div>
        <clipper-basic :src="src" preview="preview-basic"></clipper-basic>
        <router-link to="/basic">Go to Playground</router-link>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="text-subtitle mb-3">Preview</div>
        <clipper-preview name="preview-basic"></clipper-preview>
      </v-col>
    </v-row>
    <h2 class="text-h2 mt-10 mb-5">clipper-fixed</h2>
    <v-row>
      <v-col cols="12" sm="6">
        <clipper-fixed
          :src="src"
          bg-color="black"
          preview="preview-fixed"
        ></clipper-fixed>
        <router-link to="/fixed">Go to Playground</router-link>
      </v-col>
      <v-col cols="12" sm="6">
        <clipper-preview name="preview-fixed"></clipper-preview>
      </v-col>
    </v-row>
    <div class="height-placeholder"></div>
  </div>
</template>

<script>
import pic from "@/assets/sea.jpg";

export default {
  name: "Home",
  data: () => ({
    src: pic,
    code: '<h2 class="text-h2 mt-10 mb-5">clipper-basic</h2>'
  }),
  methods: {
    gotoDocument() {
      window.open(
        "https://github.com/timtnleeProject/vuejs-clipper#vuejs-clipper",
        "_blank"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.height-placeholder {
  height: 300px;
}
</style>
