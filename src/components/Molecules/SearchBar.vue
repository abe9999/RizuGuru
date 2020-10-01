<template>
  <div>
    <InputFormForSearch
      :message="buttonMessage"
      :action="buttonAction"
      :getter="getter"
      :setter="setter"
      :searchButtonAction="searchButtonAction"
    />
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
    getter: Function,
    setter: Function,
    searchButtonAction: Function,
  },
};
</script>

<style scoped>
</style>