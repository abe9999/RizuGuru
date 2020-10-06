<template>
  <div class="wrapper">
    <Headline headline="店舗登録" />
    <SubHead subHead="店舗の新規登録が完了しました" />
    <Button message="ホームへ" :action="buttonAction" />
  </div>
</template>

<script>
import Headline from "@/components/Molecules/Headline.vue";
import SubHead from "@/components/Molecules/SubHead.vue";
import Button from "@/components/Atoms/Button.vue";
export default {
  components: {
    Headline,
    SubHead,
    Button,
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
  margin-left: 50px;
  margin-top: 20px;
}
</style>