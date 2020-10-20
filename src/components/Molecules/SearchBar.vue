<template>
  <header class="wrapper">
    <InputFormForSearch
      class="search-bar-item"
      :message="buttonMessage"
      :action="buttonAction"
      :getter="getter"
      :setter="setter"
      :searchButtonAction="searchButtonAction"
    />
  </header>
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
.wrapper {
  position: -webkit-sticky;
  position: sticky;
  top: -1px;
  z-index: 100;
  background-color: white;
}

.search-bar-item {
  margin: 0 auto;
  padding-top: 15px;
  padding-bottom: 15px;
  width: 80%;
}

@media (max-width: 560px) {
  .search-bar-item {
    width: 100%;
  }
}
</style>