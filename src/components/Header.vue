<template>
<div>
   <header>
     <div class="wrap">
        <h2>vuejs-clipper</h2>
        <div class="flex">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/basic">clipper-basic</router-link></li>
          <li><router-link to="/fixed">clipper-fixed</router-link></li>
          <li><a href="" @click.prevent="show=!show">Examples</a></li>
        </div>
      <span class="gh-issue"></span>
      <span class="gh-stars"></span>
     </div>
    </header>
    <my-list class="list" v-model="show"></my-list>
</div>
</template>
<script>
import myList from '@/components/List.vue';
export default {
  mounted () {
    this.$el.querySelector('.gh-issue').appendChild(document.querySelector('#github-issue'))
    this.$el.querySelector('.gh-stars').appendChild(document.querySelector('#github-stars'))
  },
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
.wrap{
  width: 100%;
  max-width: 700px;
}
header {
  display: flex;
  justify-content: center;
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
  span {
    padding-right: 5px;
  }
  & li {
    color: #02f252;
    font-size: 1.2rem;
  }
}

.flex {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  align-items: center;
  padding-bottom: 6px;
  // justify-content: center;
  * {
    padding-right: 5px;
  }
}
@media only screen and(max-width: 596px) {
  header li{
    font-size: 1rem;
  }
}

</style>
