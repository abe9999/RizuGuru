import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import { BootstrapVueIcons } from "bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "./store";
import linq from "linq";

Vue.use(BootstrapVueIcons);
Vue.use(linq);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
