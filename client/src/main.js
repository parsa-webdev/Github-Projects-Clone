import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import createAxiosResponseInterceptor from "./helpers/axios_interceptors";

Vue.config.productionTip = false;

Vue.use(createAxiosResponseInterceptor);

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
