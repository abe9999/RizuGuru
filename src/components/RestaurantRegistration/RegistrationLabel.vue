<template>
  <label>
    {{ name }}
    <ResistrationRequired v-if="required" />
    <ResistrationCaution :caution="caution" />
  </label>
</template>

<script>
import ResistrationRequired from "@/components/RestaurantRegistration/RegistrationRequired.vue";
import ResistrationCaution from "@/components/RestaurantRegistration/RegistrationCaution.vue";

export default {
  props: {
    name: String,
    required: Boolean,
    caution: String,
  },
  components: {
    ResistrationRequired,
    ResistrationCaution,
  },
};
</script>

<style scoped>
label {
  display: flex;
  padding-bottom: 5px;
}
</style>