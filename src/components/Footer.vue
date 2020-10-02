<template>
  <footer class="border-top footer text-muted">
    <div class="container">
      <div class="item">2020 - RizuGuru -</div>
      <b-button
        class="item"
        v-if="!isAuthed"
        @click="administratorLogin"
        variant="outline-success"
        >管理者ページ</b-button
      >
      <b-button
        class="item"
        v-if="isAuthed"
        @click="administratorLogout"
        variant="outline-success"
        >ログアウト</b-button
      >
    </div>
    <b-col sm="1"></b-col>
    <b-col sm="10"> </b-col>
    <b-col sm="1"> </b-col>
  </footer>
</template>

<style src="../assets/css/site.css">
</style>

<style scoped>
.container {
  display: flex;
  -webkit-justify-content: space-around;
  justify-content: space-between;
}

.item {
  height: 80%;
  margin-top: auto;
  margin-bottom: auto;
}
</style>

<script>
export default {
  methods: {
    administratorLogin() {
      // 管理者ログイン
      this.$store.dispatch("Auth/setAuth", true);
    },
    administratorLogout() {
      // 管理者ログイン
      this.$store.dispatch("Auth/setAuth", false);
    },
  },
  computed: {
    isAuthed() {
      return this.$store.getters["Auth/getAuth"];
    },
  },
};
</script>