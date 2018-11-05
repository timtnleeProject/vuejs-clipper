<template>
<div>
    <div class="popup" v-if="popup">
        <div class="popup-content">
          <div class="flow">
            <clipper-fixed :src="src" ref="clipper" class="clipper-fixed" :round="true"></clipper-fixed>
            <div class="flex-center">
                <button class="btn g" @click="confirm">confirm</button>
                <button class="btn r" @click="cancel">cancel</button>
            </div>
          </div>
          <img src="icon/cancel.png" alt="" class="close" @click="cancel">
        </div>
    </div>
    <div class="list-content content">
        <div class="area">
            <h3 class="tc">Edit Profile</h3>
            <div class="flex center">
                <div class="pic-con">
                    <img :src="clipResult" @load="resultDone">
                    <clipper-upload class="upload" v-model="src" @input="open"><span>upload image</span></clipper-upload>
                    <div v-if="!done" class="flex-center cen">
                      <loader>Converting</loader>
                    </div>
                </div>
                <div class="edit-area mt">
                    <div>
                        <label>First Name: </label>
                        <input type="text">
                    </div>
                    <div>
                        <label>Last Name: </label>
                        <input type="text">
                    </div>
                    <div>
                        <label>Tel: </label>
                        <input type="text"><br>
                    </div>
                    <div>
                        <label>Address: </label>
                        <input type="text"><br>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { trans as code } from '@/code.js';
import clipToURL from '@/clip.js';
import Loader from '@/components/Loader.vue';
export default {
  components: {
    Loader
  },
  extends: {
    mixins: [clipToURL]
  },
  data: () => {
    return {
      popup: false,
      clipResult: 'profile.png',
      src: '',
      link: '',
      done: false,
      code
    };
  },
  methods: {
    open: function() {
      this.popup = true;
    },
    close: function() {
      this.popup = false;
    },
    confirm: function() {
      this.done = false;
      this.clipResult = null;
      this.clipToURL();
      this.close();
    },
    cancel: function() {
      this.close();
    }
  }
};
</script>

<style lang="scss" scoped>
.center {
  justify-content: center;
}
.cen{
  pointer-events: none;
  align-items: center;
  background-color: rgba(255,255,255,0.8);
}
.tc {
  text-align: center;
}

.mt {
  margin-top: 8px;
}

.edit-area {
  text-align: left;
}

.edit-area > div {
  word-wrap: nowrap;
}

input {
  width: 150px;
  border: 1px solid gray;
  border-radius: 3px;
  margin-bottom: 10px;
  margin-right: 10px;
}

input[type="textarea"] {
  height: 200px;
}

.pic-con {
  flex-basis: 250px;
  height: 250px;
  flex-shrink: 0;
  flex-grow: 0;
  margin: 0px 20px 20px 0px;
  overflow: hidden;
  position: relative;
  border-radius: 50%;

  & > * {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
  }
}

.upload {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.3);
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.4s;

  &:hover {
    opacity: 1;
  }
}

.clipper-fixed {
  max-width: 500px;
  width: 80vw;
}
</style>
