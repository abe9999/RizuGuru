import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate"
import Auth from "./modules/Auth.js"

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Auth
  },
  strict: true,
  plugins: [createPersistedState({
    key: "RizuGuru",
    paths: ["Auth.isAuthed"],
    storage: window.sessionStorage
  })]
});

export default store;
