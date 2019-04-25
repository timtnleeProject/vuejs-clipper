<template>
    <div class="content fixed">
        <div class="gotop" @click="goToTop">
        <div class="circle"></div>
        <div class="text">
            <span>Top</span>
        </div> 
    </div>
    </div>
</template>

<script>
export default {
  methods: {
    goToTop: function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.fixed{
    position: fixed;
    bottom: 20px;
    pointer-events: none;
}
.gotop {
  border: 1px solid white;
  box-sizing: border-box;
  cursor: pointer;
  pointer-events: auto;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: black;
  opacity: 0.3;
  color: white;
  & div {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}
.circle {
  transition: all 0.3s;
  border-radius: 50%;
  border: 1px solid white;
  transform: scale(1);
}
.gotop:hover .circle {
  transform: scale(0);
}
.text {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
