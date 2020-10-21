<template>
  <header class="wrapper">
    <InputFormForSearch
      class="top-item"
      :message="buttonMessage"
      :action="buttonAction"
      :getter="getter"
      :setter="setter"
      :searchButtonAction="searchButtonAction"
    />
    <section class="bottom-item">
      <b-button
        class="bottom-item-button"
        variant="success"
        @click="searchButtonAction"
        ><b-icon icon="search" />
        <span class="button-message">検索</span>
      </b-button>
      <b-button class="bottom-item-button" @click="buttonAction"
        ><b-icon icon="filter-left" />
        <span class="button-message">絞り込む</span>
      </b-button>
    </section>
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
  padding-bottom: 5px;
}

.top-item {
  margin: 0 auto;
  padding-top: 15px;
  padding-bottom: 5px;
  width: 80%;
}

.bottom-item {
  display: none;
}

.bottom-item-button {
  width: 49%;
}

.button-message {
  margin-left: 5px;
}

@media (max-width: 767px) {
  .top-item {
    width: 100%;
  }

  .bottom-item {
    display: flex;
    justify-content: space-around;
  }
}
</style>