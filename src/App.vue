<template>
  <div id="app">
    <Admin v-if="isAuthed"/>
    <Header v-else />
    <router-view />
    <Footer />
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import Header from "./components/Header.vue";
import Admin from "./components/HeaderForAdmin.vue";
import Footer from "./components/Footer.vue";
export default {
  components: {
    Header,
    Admin,
    Footer,
  },
  computed: {
    isAuthed() {
      // ログイン状態取得
      return this.$store.getters["Auth/getAuth"];
    },
  },
};
</script>