<template>
    <div class="form-group">
      <label>
        ジャンル1
        <ResistrationRequired />
      </label>
      <GenreList />
      <label>ジャンル2</label>
      <GenreList />
      <label>ジャンル3</label>
      <GenreList />
    </div>
</template>

<script>
import ResistrationRequired from "@/components/RestaurantRegistration/RegistrationRequired.vue";
import GenreList from "@/components/RestaurantRegistration/GenreList.vue";

export default {
  components: {
    ResistrationRequired,
    GenreList,
  },
};
</script>