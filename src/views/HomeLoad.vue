<template>
<div class="loader-con">
  <div class="loader">
      <div class="dot"><div></div></div>
      <div class="dot"><div></div></div>
      <div class="dot"><div></div></div>
      <div class="dot"><div></div></div>
      <div class="dot"><div></div></div>
    </div>
    <loader class="loader-text" :done="done">
        Loading Pictures
    </loader>
</div>
</template>

<script>
const testPromise = new Promise((resolve, reject) => {
  setTimeout(resolve, 16);
});
const imgList = [
  "dawn.jpg",
  "ex1.jpg",
  "ex2.jpg",
  "ex3.jpg",
  "lily.jpg",
  "long.jpg",
  "profile.png"
];
function imgLoadPromise(list) {
  const promises = [];
  list.forEach(src => {
    promises.push(
      new Promise((resolve, reject) => {
        let div = document.createElement("DIV");
        let img = document.createElement("IMG");
        div.appendChild(img);
        div.style.display = "none";
        img.src = src;
        img.onload = function() {
          resolve();
        };
        img.onerror = function() {
          resolve();
        };
        document.body.appendChild(div);
        if (img.isComplete) resolve();
      })
    );
  });
  return promises;
}
import Loader from '@/components/Loader.vue'
export default {
  components: {
      Loader
  },
  mounted() {
    const promises = imgLoadPromise(imgList);
    Promise.all([...promises, testPromise]).then(() => {
      this.done = true;
      this.$emit("load");
    });
  },
  data: () => {
    return {
      done: false
    };
  }
};
</script>

<style lang="scss" scoped>
.loader-con {
 position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.loader {
  width: 80px;
  height: 80px;
  flex-basis: 80px;
  flex-grow: 0;
  position: relative;
  box-sizing: border-box;
}
.loader .dot {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.dot > div {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: absolute;
  background-color: black;
  opacity: 0.9;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
}
.dot:nth-child(1) {
  transform: rotate(0deg);
  animation: spin1 2s 0.6s ease infinite;
}
.dot:nth-child(2) {
  transform: rotate(20deg);
  animation: spin2 2s 0.45s ease infinite;
}
.dot:nth-child(3) {
  transform: rotate(40deg);
  animation: spin3 2s 0.3s ease infinite;
}
.dot:nth-child(4) {
  transform: rotate(60deg);
  animation: spin4 2s 0.15s ease infinite;
}
.dot:nth-child(5) {
  transform: rotate(80deg);
  animation: spin5 2s ease infinite;
}
.loader-text {
    margin-top: 15px;
    flex-basis: 1rem;
    flex-grow: 0;
}
@keyframes spin1 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes spin2 {
  from {
    transform: rotate(20deg);
  }
  to {
    transform: rotate(380deg);
  }
}
@keyframes spin3 {
  from {
    transform: rotate(40deg);
  }
  to {
    transform: rotate(400deg);
  }
}
@keyframes spin4 {
  from {
    transform: rotate(60deg);
  }
  to {
    transform: rotate(420deg);
  }
}
@keyframes spin5 {
  from {
    transform: rotate(80deg);
  }
  to {
    transform: rotate(440deg);
  }
}
</style>

