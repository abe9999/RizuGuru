<template>
  <div class="wrapper">
    <!-- <Counter :value="restaurantCount" /> -->
    <div
      v-for="(restaurantData, index) in restaurantList"
      class="list-item"
      :id="index"
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
      <div slot="no-results" class="no-results">
        <!-- 検索結果が無かった場合の表示欄 -->
        <div v-if="restaurantList.length == 0">
          <img src="@/assets/images/no-results.png" />
          <p>検索条件に該当する店舗が見つかりませんでした。</p>
        </div>
      </div>
      <div slot="no-more">
        <!-- 検索結果の最後の要素に達した場合の表示欄 -->
        <p></p>
      </div>
      <div slot="error">
        <!-- 検索結果の最後の要素に達した場合の表示欄 -->
        <p>Error!</p>
      </div>
    </infinite-loading>
    <div id="page_top"><a @click="scrollTop"></a></div>
  </div>
</template>

<script>
// import Counter from "@/components/Atoms/RestaurantList/Counter.vue";
import ListItemContainer from "@/components/Molecules/RestaurantList/ListItemContainer.vue";
export default {
  components: {
    // Counter,
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
  },
  methods: {
    scrollTop() {
        let currentY = window.pageYOffset;
        let step = 500 / currentY > 1 ? 10 : 100;
        let timeStep = (500 / currentY) * step;
        let intervalID = setInterval(scrollUp, timeStep);

        function scrollUp() {
          currentY = window.pageYOffset;
          if (currentY === 0) {
            clearInterval(intervalID);
          } else {
            scrollBy(0, -step);
          }
      }
    },
  },
};
</script>

<style scoped>
#page_top {
  width: 40px;
  height: 40px;
  position: fixed;
  right: 0;
  bottom: 10px;
  background: #1c7061;
  opacity: 0.6;
  transition: 1ms;
}
#page_top a {
  position: relative;
  display: block;
  width: 40px;
  height: 40px;
  text-decoration: none;
}
#page_top a::after {
  content: "▲";
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  position: absolute;
  top: 10px;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  text-align: center;
}
@media (min-width: 767px) {
  .list-item {
    width: 90%;
    margin: 0 auto;
  }
}
</style>