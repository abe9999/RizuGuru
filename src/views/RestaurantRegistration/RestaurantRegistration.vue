<template>
  <div class="wrapper">
    <Headline headline="店舗登録" />
    <SubHead subHead="店舗基本情報" />
    <Basic />
    <SubHead subHead="店舗詳細情報" />
    <Detailed />
    <button type="submit" class="btn">登録する</button>
  </div>
</template>

<script>
import Headline from "@/components/RestaurantRegistration/Headline.vue";
import SubHead from "@/components/RestaurantRegistration/SubHead.vue";
import Basic from "@/components/RestaurantRegistration/Basic.vue";
import Detailed from "@/components/RestaurantRegistration/Detailed.vue";

export default {
  components: {
    Headline,
    SubHead,
    Basic,
    Detailed,
  },
};
</script>

<style scoped>
.wrapper {
  margin-top: 20px;
  margin-left: 20px;
  font-size: 0.9em;
}

.btn {
  background-color: #2e603b;
  color: white;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>