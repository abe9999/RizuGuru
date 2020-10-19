<template>
  <section class="wrapper">
    <img src="@/assets/images/no-results.png" />
    <p>指定されたページが見つかりませんでした</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <Button :message="buttonMessage" :action="buttonAction" />
  </section>
</template>

<script>
import Button from "@/components/Atoms/Button";
export default {
  components: {
    Button,
  },
  props: {
    errorMessage: Error,
  },
  data() {
    return {
      buttonMessage: "トップに戻る",
    };
  },
  methods: {
    buttonAction() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 90%;
  margin-top: 5%;
  margin: 0 auto;
  text-align: center;
  font-size: larger;
}
</style>