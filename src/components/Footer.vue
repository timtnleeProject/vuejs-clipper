<template>
    <footer class="all-center">
        <div class="sm all-center">
          <div> vuejs-clipper</div>
          <div>
            <a href="mailto:litingen1995@gmail.com">litingen1995@gmail.com</a>
            <a href="https://paypal.me/timtnlee?locale.x=zh_TW" target="_blank">Buy me a coffee</a>
          </div>
        </div>
    </footer>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
footer {
  color: white;
  height: 240px;
  background-color: black;
}
.sm {
  width: 100%;
  max-width: 600px;
  justify-content: space-around;
  flex-wrap: wrap;
  a {
    padding: 5px;
    display: block;
    color: #eeeeee;
  }
}
</style>
