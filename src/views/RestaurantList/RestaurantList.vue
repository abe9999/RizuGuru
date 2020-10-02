<template>
  <div class="wrapper">
    <div>
      <b-container class="d-flex justifiy-content-center" fluid>
        <List
          :filteringButtonAction="filteringButtonAction"
          :restaurantList="restaurantList"
          :restaurantCount="restaurantCount"
          :getSearchKeyword="getSearchKeyword"
          :setSearchKeyword="setSearchKeyword"
          :searchButtonAction="searchButtonAction"
          v-if="!loading"
        />
        <img
          class="loading"
          src="@/assets/images/loading.gif"
          v-else-if="loading"
        />
      </b-container>
    </div>
  </div>
</template>

<script>
import List from "@/components/Templates/RestaurantList/List.vue";
import { searchRestaurantList } from "@/plugins/searchRestaurantList.js";

export default {
  components: {
    List,
  },
  data() {
    return {
      query: {},
      restaurantData: [],
      restaurantCount: null,
      keyword: "",
      loading: true,
    };
  },
  methods: {
    getSearchKeyword() {
      return this.keyword;
    },
    setSearchKeyword(value) {
      this.keyword = value;
    },
    filteringButtonAction() {
      this.$router.push({
        name: "Filtering",
        query: this.query,
      });
    },
    searchButtonAction() {
      // 入力フォームの検索ボタンをしたときの処理
      this.query.keyword = this.keyword;
      this.searchRestaurantList();
    },
    searchRestaurantList() {
      // 店舗検索処理
      // ローディングのくるくるを表示
      this.loading = true;
      searchRestaurantList(this.query).then((res) => {
        this.restaurantData = res;
        this.restaurantCount = res.length;
        // ローディングのくるくるを非表示に
        this.loading = false;
      });
    },
  },
  mounted() {
    this.query = this.$route.query;
    // 検索フォームに前画面のキーワードを代入
    this.keyword = this.query.keyword;
    // 検索処理を実行
    this.searchRestaurantList();
  },
  computed: {
    restaurantList() {
      return this.restaurantData;
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 95%;
  margin: 10px auto 0 auto;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
}
</style>