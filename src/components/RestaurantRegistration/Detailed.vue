<template>
  <div class="detailed">
    <RegistrationItem name="交通手段" example="四ツ谷駅から徒歩7分 四谷三丁目駅から徒歩10分" />
    <RegistrationItem name="支払方法" example="現金、クレジットカード" />
    <LinkForm />
    <TagForm />
  </div>
</template>

<script>
import RegistrationItem from "@/components/RestaurantRegistration/RegistrationItem.vue";
import LinkForm from "@/components/RestaurantRegistration/LinkForm.vue";
import TagForm from "@/components/RestaurantRegistration/TagForm.vue";

export default {
  data() {
    return {
      tags: ["大盛無料", "おかわり無料", "テイクアウト可"],
    };
  },
  components: {
    RegistrationItem,
    LinkForm,
    TagForm
  },
};
</script>