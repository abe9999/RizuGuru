<template>
  <div class="wrapper">
    <Headline headline="メニュー登録" />
    <SubHead subHead="メニューの新規登録が完了しました" />
    <Button message="ホームへ" :action="buttonAction" />
  </div>
</template>

<script>
import Headline from "@/components/RestaurantRegistration/Molecules/Headline.vue";
import SubHead from "@/components/RestaurantRegistration/Molecules/SubHead.vue";
import Button from "@/components/RestaurantRegistration/Atoms/Button.vue";
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

<style>
.wrapper {
  margin-left: 50px;
  margin-top: 20px;
}
</style>