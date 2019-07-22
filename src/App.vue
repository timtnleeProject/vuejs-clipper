<template>
  <div id="app">
    <my-header></my-header>
    <notification></notification>
    <home-loader v-if="!done" @load="loaded"></home-loader>
    <router-view v-if="done"/>
    <go-top></go-top>
    <my-footer></my-footer>
  </div>
</template>
<script>
import HomeLoader from './views/HomeLoad.vue'
import Notification from './components/Notification.vue'
import myHeader from './components/Header.vue'
import myFooter from './components/Footer.vue'
import goTop from './components/GoTop.vue'
export default {
  data: () => {
    return { 
      done: false
    };
  },
  components: {
    myHeader,
    Notification,
    myFooter,
    goTop,
    HomeLoader
  },
  methods: {
    loaded: function(){
      this.done = true;
    }
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  font-size: 100%;
}

.btn {
  margin: 5px;
  border-radius: 3px;
  padding: 6px;
  color: white;
  cursor: pointer;
  border: none;
  font-family: inherit;
  font-weight: normal;
  background-color: gray;
  display: inline-block;
  transition: opacity 0.6s;
  font-size: 1.1rem;
  &:hover {
    opacity: 0.8;
  }
  &.g {
    background-color: #76e02f;
  }
  &.b {
    background-color: lightblue;
  }
  &.r {
    background-color: red;
  }
}
ul {
  padding-left: 25px;
}
h1 {
  font-weight: normal;
  font-size: 2.2rem;
}
h2 {
  font-weight: normal;
  font-size: 2rem;
}
h3 {
  font-weight: normal;
  font-size: 1.7rem;
}
h4 {
  font-weight: normal;
  font-size: 1.4rem;
}
.left {
  text-align: left;
}
.center {
  text-align: center;
}
.content {
  box-sizing: border-box;
  padding: 30px;
  width: 100%;
  max-width: 1200px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.icon {
  width: 1.4em;
  vertical-align: bottom;
}
.tab {
  padding-left: 15px;
  padding-bottom: 15px;
}
.pd {
  padding: 10px 0px;
}
.popup {
  z-index: 10;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & .popup-content {
    border: 1px solid lightgray;
    border-radius: 5px;
    box-sizing: content-box;
    padding: 10px;
    background-color: white;
    position: relative;
  }
  & .flow {
    max-width: 80vw;
    max-height: 90vh;
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
  & .img {
    width: 100%;
    height: auto;
    display: block;
  }
  & .close{
    position: absolute;
    width: 30px;
    height:30px;
    top: -15px;
    right: -15px;
    display: block;
    z-index: 20;
    cursor: pointer;
  }
  
}
.w80 {
  width: 80px;
}
.color-tick {
  border: 1px solid gray;
  border-radius: 5px;
  width: 35px;
  height: 1em;
  display: inline-block;
}
.shadow-tick {
  border: 1px solid gray;
  border-radius: 5px;
  width: 35px;
  height: 1em;
  display: inline-block;
}
.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.flex-center {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & div {
    flex-basis: 0;
    flex-grow: 1;
  }
}
.all-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
pre>code {
  border-radius: 5px;
  box-sizing: border-box;
  border: 2px solid brown;
}
@media only screen and(max-width:596px) {
  .flex-center {
    & div {
      flex-basis: 100%;
    }
  }
  .label {
    flex-grow: 1;
    flex-basis: 100%;
  }
}
.range {
  display: inline-block;
  width: 100%;
  max-width: 350px;
}
.label {
  font-weight: bold;
}
</style>
