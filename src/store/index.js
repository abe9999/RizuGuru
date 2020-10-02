import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate"
import Filtering from "./modules/RestaurantList/Filtering.js";
import UserData from "./modules/UserData.js";
import Location from "./modules/Location.js";
import Search from "./modules/Search.js";
import Auth from "./modules/Auth.js"

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Filtering,
    UserData,
    Location,
    Search,
    Auth
  },
  strict: true,
  plugins: [createPersistedState({
    key: "RizuGuru",
    paths: ["Location.lat", "Location.lng"],
    storage: window.sessionStorage
  })]
});

export default store;
