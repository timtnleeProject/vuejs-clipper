<template>
  <div class="gallary-wrap">
    <img v-for="(src, i) in srcs" :key="i" :src="src" alt="" @click="onSelect(src)" />
  </div>
</template>

<script>
import pic1 from "@/assets/sea.jpg";
import pic2 from "@/assets/goats.jpg";
import pic3 from "@/assets/cows.jpg";

export default {
  data: () => ({
    srcs: [pic1, pic2, pic3]
  }),
  methods: {
    append(src) {
      this.srcs.push(src);
    },
    onSelect(src) {
      this.$emit("select", src);
    }
  }
};
</script>

<style lang="scss" scoped>
.gallary-wrap {
  display: flex;
  width: 100%;
  height: 100px;
  overflow: auto;
  align-items: stretch;
  img {
    height: 100%;
    border: 1px solid black;
    cursor: pointer;
  }
}
</style>
