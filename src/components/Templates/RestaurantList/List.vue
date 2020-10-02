<template>
  <div class="wrapper">
    <SearchBar
      buttonMessage="絞り込む"
      :buttonAction="filteringButtonAction"
      :getter="getSearchKeyword"
      :setter="setSearchKeyword"
      :searchButtonAction="searchButtonAction"
    />
    <hr />
    <Counter :value="restaurantCount" />
    <div
      class="list-item"
      v-for="(restaurantData, index) in restaurantList"
      :key="index"
    >
      <ListItemContainer :restaurantData="restaurantData" />
      <hr />
    </div>
  </div>
</template>

<script>
import Counter from "@/components/Atoms/RestaurantList/Counter.vue";
import SearchBar from "@/components/Molecules/SearchBar.vue";
import ListItemContainer from "@/components/Molecules/RestaurantList/ListItemContainer.vue";
export default {
  components: {
    Counter,
    SearchBar,
    ListItemContainer,
  },
  props: {
    filteringButtonAction: Function,
    restaurantList: Array,
    restaurantCount: Number,
    getSearchKeyword: Function,
    setSearchKeyword: Function,
    searchButtonAction: Function,
  },
};
</script>

<style scoped>
@media (min-width: 560px) {
  .list-item {
    width: 70%;
    margin: 0 auto;
  }
}
</style>