<template>
    <transition name="fade">
        <div class="notification" @click="cancelNote" v-if="!cancel">
            <img src="icon/cancel.png">
            {{msg}}
        </div>
    </transition>
</template>

<script>
export default {
  data () {
    return {
      msg: 'NOTICE: These pages using the latest version components on GitHub that is fixing or migrating to upcoming version instead of the published version of NPM.',
      cancel: false
    }
  },
  methods: {
    cancelNote: function () {
      this.cancel = true
    }
  }
}
</script>

<style lang="scss" scoped>
.notification {
    cursor: pointer;
    width: 100%;
    padding: 10px 50px;
    box-sizing: border-box;
    background-color: white;
    transition: all 1.5s;
    color: red;
    text-align: center;
    box-shadow: 1px 1px 3px gray;
    font-size: 0.8rem;
    transform-origin: 0% 0%;
    img {
        width: 0.8rem;
    }
}
.fade-leave-active {
  transition: all 1.5s;
}
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: scaleY(0);
}
</style>

