<template>
  <div>
    <SearchBar buttonMessage="絞り込む" :buttonAction="filteringButtonAction" />
    <hr />
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
import SearchBar from "@/components/Molecules/SearchBar.vue";
import ListItemContainer from "@/components/Molecules/RestaurantList/ListItemContainer.vue";
export default {
  components: {
    SearchBar,
    ListItemContainer,
  },
  props: {
    filteringButtonAction: Function,
    restaurantList: Array,
  },
};
</script>

<style scoped>
</style>