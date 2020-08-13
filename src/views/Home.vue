<template>
  <div class="home">
    <h1 class="text-h1 text-center my-10">Vuejs Clipper</h1>
    <v-card>
      <v-card-title>Feature</v-card-title>
      <v-card-text>Vue.js image clipping components using vue-rx.</v-card-text>
      <v-card-text
        >Add image clipping components to your Vue application in nothing
        flat.</v-card-text
      >
      <v-card-text>Touch devices supported and fully responsive.</v-card-text>
    </v-card>
    <h2 class="text-h2 mt-10 mb-5">clipper-basic</h2>
    <v-row>
      <v-col cols="12" sm="6">
        <div class="text-subtitle mb-3">Component</div>
        <clipper-basic :src="src" preview="preview-basic"></clipper-basic>
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
    src: pic
  })
};
</script>

<style lang="scss" scoped>
.height-placeholder {
  height: 300px;
}
</style>
