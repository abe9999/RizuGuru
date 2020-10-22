import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate"
import Auth from "./modules/Auth.js"
import CurrentLocation from "./modules/CurrentLocation.js"

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Auth,
    CurrentLocation
  },
  strict: true,
  plugins: [createPersistedState({
    key: "RizuGuru",
    paths: ["Auth.isAuthed", "CurrentLocation.currentLocation"],
    storage: window.sessionStorage
  })]
});

export default store;
