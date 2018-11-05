<template>
<div class="loader-con" v-if="!done">
    <div class="load-text">
      <span>
        <slot></slot>
      </span>
      <span class="dats">
        <span class="dat"></span>
        <span class="dat"></span>
        <span class="dat"></span>
      </span>
    </div>
</div>
</template>

<script>
export default {
  props: ['done']
};
</script>

<style lang="scss" scoped>
.load-text {
  margin-top: 15px;
  color: gray;
  & .dat {
    border-radius: 50%;
    background-color: gray;
    width: 0.8rem;
    height: 0.8rem;
    display: inline-block;
  }
}
@for $i from 1 through 3 {
  .dat:nth-child(#{$i}) {
    transform: scale(0.6);
    animation: load 1s #{$i * 0.3}s infinite;
  }
}
@keyframes load {
  from {
    transform: scale(0.6);
  }
  to {
    transform: scale(0.2);
  }
}
</style>

