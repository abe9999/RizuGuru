<template>
  <div>
    <InputFormForSearch :message="buttonMessage" :action="buttonAction" />
  </div>
</template>

<script>
import InputFormForSearch from "@/components/Atoms/InputFormForSearch.vue";
export default {
  components: {
    InputFormForSearch,
  },
  props: {
    buttonAction: Function,
    buttonMessage: String,
  },
};
</script>

<style scoped>
</style>