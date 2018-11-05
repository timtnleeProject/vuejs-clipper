<template>
    <div>
        <clipper-upload class="upload" v-model="src">upload</clipper-upload>
        {{src}}
        <clipper-basic name="basic"></clipper-basic>
    </div>
</template>

<script>
export default {
    data: ()=> {
        return {
            src:''
        }
    }
}
</script>

<style>

</style>

