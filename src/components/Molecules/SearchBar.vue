<template>
  <div class="search-input">
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
@media (min-width: 560px) {
  .search-input {
    width: 70%;
    margin: 0 auto;
  }
}
</style>