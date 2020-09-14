<template>
  <div>
    <RegistrationLabel :name="name" :required="required" :caution="caution" />
    <RegistrationInput :placeholder="example" />
  </div>
</template>

<script>
import RegistrationLabel from "@/components/RestaurantRegistration/RegistrationLabel.vue";
import RegistrationInput from "@/components/RestaurantRegistration/RegistrationInput.vue";

export default {
  props: {
    name: String,
    required: Boolean,
    caution: String,
    example: String,
  },
  components: {
    RegistrationLabel,
    RegistrationInput,
  },
};
</script>

<style scoped>
div {
  margin-bottom: 10px;
}
</style>