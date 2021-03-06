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
import InfiniteLoading from 'vue-infinite-loading';

// ApolloServer
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
const apolloClient = new ApolloClient({
  uri: 'https://func-rizugurufrontendfunction.azurewebsites.net/api/RizuGuru?code=hj0i58NcjEyaX2bBLtD/8vGg6jpXq0u3gAeMomGJ4q4uCYu9BDaGDw=='
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})
Vue.use(VueApollo);

Vue.use(BootstrapVueIcons);
Vue.use(linq);
Vue.component('infinite-loading', InfiniteLoading)
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
