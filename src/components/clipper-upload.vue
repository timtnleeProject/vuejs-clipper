<template>
  <button @click="triggerInput">
      <slot></slot>
      <input type="file" class="upload" @change="upload($event)" style="display:none">
  </button>    
</template>

<script>
export default {
    mounted(){
        this.uploadEl = this.$el.querySelector('.upload')
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        check: {
            type: Boolean,
            default: true
        }
    },
    data: ()=>{
        return {
            uploadEl: null
        }
    },
    methods: {
        upload: function(e){
            if(e.target.files.length!==1) return;
            const file = e.target.files[0];
            if (this.check && !file.type.startsWith('image/')) return;
            this.$emit('input', window.URL.createObjectURL(file)) 
        },
        triggerInput: function(){
            if(this.uploadEl) this.uploadEl.click();
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
