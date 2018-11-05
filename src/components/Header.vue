<template>
<div>
   <header>
      <h1>vuejs-clipper</h1>
    <ul class="flex">
      <li><router-link to="/">Home</router-link></li>
      <!-- <li><a href="" target="blank">NPM</a></li> -->
      <li><a href="https://github.com/timtnleeProject/vuejs-clipper" target="_blank">GitHub</a></li>
      <li><router-link to="/basic">clipper-basic</router-link></li>
      <li><router-link to="/fixed">clipper-fixed</router-link></li>
      <li><a href="" @click.prevent="show=!show">Examples</a></li>
    </ul>
    </header>
    <my-list class="list" v-model="show"></my-list>
</div>
</template>
<script>
import myList from "@/components/List.vue";
export default {
  components: {
    myList
  },
  data: () => {
    return {
      show: false
    };
  }
};
</script>
<style lang="scss" scoped>
header {
  text-align: center;
  background-color: black;
  color: white;
  padding: 20px;
  & a {
    text-decoration: none;
    display: block;
    border-left: 1px solid white;
    padding-left: 5px;
    margin: 1px;
    color: inherit;
  }
  & a:hover {
    opacity: 0.7;
  }
  & li {
    color: #02f252;
    font-size: 1.2rem;
    margin-right: 20px;
  }
}

.flex {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: center;
}
@media only screen and(max-width: 596px) {
  header li{
    font-size: 1rem;
  }
}

</style>
