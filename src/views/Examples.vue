<template>
<div>
    <div class="list-container">
        <router-view></router-view>
    </div>
</div>
</template>
<script>
export default {
  data: () => {
    return {
    };
  },
};
</script>
<style lang="scss" scoped>
code {
  border-radius: 5px;
}
.list-container {
  & .list-content {
    box-sizing: border-box;
    padding: 30px;
  }
}
</style>
