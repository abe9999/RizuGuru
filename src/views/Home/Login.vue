<template>
  <b-container class="main">
    <HeadLine :headline="headLine" />
    <b-row>
      <b-col sm="10">
        <b-form-group label="ユーザーID">
          <b-form-input
            v-model="userData.id"
            :state="idValidator"
            type="email"
            placeholder="IDを入力してください。"
          />
          <b-form-invalid-feedback :state="idValidator">IDを入力してください。</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="パスワード">
          <b-form-input
            v-model="userData.password"
            :state="passwordValidator"
            type="password"
            placeholder="パスワードを入力してください。"
          />
          <b-form-invalid-feedback :state="passwordValidator">パスワードを入力してください。</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox>ログイン情報を保存する</b-form-checkbox>
        </b-form-group>
        <b-button @click="login" to="/">ログイン</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import HeadLine from "@/components/Login/Headline.vue";
export default {
  components: {
    HeadLine,
  },
  data() {
    return {
      headLine: "ログイン",
      userData: { id: "", password: "" },
    };
  },
  props: {},
  methods: {
    login() {
      if (this.userData.id == "" || this.userData.password == "") {
        alert("ID・パスワードを入力してください");
      } else {
        this.$store.dispatch("UserData/setUserData", { user: this.userData });
        console.log("Login!");
      }
    },
  },
  computed: {
    getUserData() {
      return this.$store.getters["UserData/getUserData"];
    },
    idValidator() {
      return this.userData.id != "";
    },
    passwordValidator() {
      return this.userData.password != "";
    },
  },
};
</script>

<style scoped>
.main {
  margin: 50px 10%;
}
</style>