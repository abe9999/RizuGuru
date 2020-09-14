<template>
  <div class="basic">
    <RegistrationItem name="店名" :required=true example="リズグル食堂" />
    <RegistrationItem name="店名(カナ)" :required=true caution="※全角カタカナ" example="リズグルショクドウ" />
    <RegistrationItem name="電話番号" :required=true caution="※半角数字+ハイフン" example="03-5919-1033" />
    <RegistrationItem name="住所(市区町村・番地)" :required=true example="新宿区四谷2-4-1" />
    <RegistrationItem name="住所(建物名・階数)" example="ACN四谷ビル6F" />
    <RegistrationItem name="営業時間" :required=true example="10:45〜15:30  17:30〜21:00" />
    <RegistrationItem name="定休日" :required=true example="土・日・祝" />
    <GenreForm />
  </div>
</template>

<script>
import RegistrationItem from "@/components/RestaurantRegistration/RegistrationItem.vue";
import GenreForm from "@/components/RestaurantRegistration/GenreForm.vue"

export default {
  components: {
    RegistrationItem,
    GenreForm
  },
};
</script>