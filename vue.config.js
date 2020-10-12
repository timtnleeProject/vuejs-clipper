module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    resolve: {
      symlinks: false // 使用npm link
    }
  }
};
