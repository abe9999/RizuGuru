<template>
  <div class="form-group">
    <RegistrationLabel name="ジャンル1" :required=true />
    <GenreList />
    <RegistrationLabel name="ジャンル2" />
    <GenreList />
    <RegistrationLabel name="ジャンル3" />
    <GenreList />
  </div>
</template>

<script>
import RegistrationLabel from "@/components/RestaurantRegistration/RegistrationLabel.vue";
import GenreList from "@/components/RestaurantRegistration/GenreList.vue";

export default {
  components: {
    RegistrationLabel,
    GenreList,
  },
};
</script>

<style scoped>
select {
  width: 90%;
  height: 30px;
  margin-bottom: 15px;
  border: 1.5px solid gray;
  border-radius: 3px;
}
</style>