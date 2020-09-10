import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "./plugins/vuejsClipper";
import "vue-code-highlight/themes/duotone-sea.css";

Vue.config.productionTip = false;

Vue.component("my-spacing", {
  render: (h) => h("div", { class: "my-5" })
});

new Vue({
  router,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
