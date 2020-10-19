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
    <!-- <Counter :value="restaurantCount" /> -->
    <div
      class="list-item"
      :id="index"
      v-for="(restaurantData, index) in restaurantList"
      :key="index"
    >
      <ListItemContainer :restaurantData="restaurantData" />
      <hr />
    </div>
    <!-- 無限スクロール処理部 -->
    <infinite-loading
      ref="infiniteLoading"
      spinner="waveDots"
      @infinite="infiniteHandler"
    >
      <div slot="no-more">
        <!-- 検索結果の最後の要素に達した場合の表示欄 -->
        <p></p>
      </div>
      <div slot="no-results" class="no-results">
        <!-- 検索結果が無かった場合の表示欄 -->
        <img src="@/assets/images/no-results.png" />
        <p>検索条件に該当する店舗が見つかりませんでした。</p>
      </div>
    </infinite-loading>
  </div>
</template>

<script>
// import Counter from "@/components/Atoms/RestaurantList/Counter.vue";
import SearchBar from "@/components/Molecules/SearchBar.vue";
import ListItemContainer from "@/components/Molecules/RestaurantList/ListItemContainer.vue";
export default {
  components: {
    // Counter,
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
    infiniteHandler: Function,
    offset: Number,
  },
};
</script>

<style scoped>
@media (min-width: 767px) {
  .list-item {
    width: 90%;
    margin: 0 auto;
  }
}
</style>