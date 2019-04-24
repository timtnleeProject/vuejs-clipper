<template>
    <div class="gallary">
      <div class="wrap" v-for="(g,i) in gallary" :key="g" :class={select:selectedGallary[i]} @click="switchGallary(i)">
        <img :src="g">
      </div>
    </div>
</template>

<script>
export default {
  props: {
    gallary: Array,
    value: String
  },
  methods: {
    switchGallary: function(i) {
      this.$emit('input', this.gallary[i])
    }
  },
  computed: {
    selectedGallary() {
      return this.gallary.map(g=>g===this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.gallary {
  display: flex;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  height: 150px;
  @media screen and(max-width:596px) {
    height: 100px;
  }
  .wrap {
    height: 100%;
    padding: 1px;
  }
  .wrap.select {
    background-color: black;
  }
  img {
    cursor: pointer;
    height: 100%;
  }
}
</style>