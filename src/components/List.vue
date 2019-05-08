<template>
<div class="list" v-bind:class="{show:show}" >
    <div class="full" @click="toggle"></div>
    <div class="my-list" @click="toggle">
      <h4>Examples</h4>
      <ul>
          <li class="el" v-for="li in list" :key="li.name">
              <router-link :to="'/examples/'+li.path">{{li.name}}</router-link>
          </li>
      </ul>
    </div>    
</div>
</template>

<script>
export default {
  props: ['value'],
  data: () => {
    return {
      list: [
        {
          name: 'Quick Start',
          path: 'quick-start'
        },
        {
          name: 'Vertical images',
          path: 'verticle-images'
        },
        {
          name: 'Canvas to Image',
          path: 'canvas-to-image'
        },
        {
          name: 'Transparent Background',
          path: 'transparent-bg'
        },
        {
          name: 'Set clipping components position',
          path: 'set-layout'
        },
        {
          name: 'Use as Image zoom-in component',
          path: 'image-zoomin'
        },
        {
          name: 'Profile Photo',
          path: 'profile-photo'
        }
      ]
    };
  },
  computed: {
    show : function(){
      return this.value
    }
  },
  methods: {
    toggle: function(){
      this.$emit('input' ,!this.show)
    },
  }
};
</script>

<style lang="scss" scoped>
.full {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 150;
  display: none;
  top: 0;
  left: 0;
}
.show .full {
  display: block;
}
.my-list {
  transform: translateX(-100%);
  // box-shadow: 3px 0px 3px lightgray;
  position: fixed;
  width: 180px;
  height: 100vh;
  padding: 30px;
  background-color: white;
  top: 0;
  left: 0;
  z-index: 200;
  transition: all 0.4s;
}
.show .my-list {
  transform: translateX(0%);
}
.el {
  text-shadow: 1px 1px 1px lightgray;
  transition: all 0.4s;
  margin: 7px 0px;
}
.el:hover {
  text-shadow: 2px 2px 1px lightgray;
  transform: translateX(5px);
}
</style>
