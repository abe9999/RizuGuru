<template>
  <b-container class="d-flex justifiy-content-center" fluid>
    <section class="wrapper" v-if="!loading">
      <SearchBar
        class="search-bar"
        buttonMessage="絞り込む"
        :buttonAction="filteringButtonAction"
        :getter="getSearchKeyword"
        :setter="setSearchKeyword"
        :searchButtonAction="searchButtonAction"
      />
      <List
        :filteringButtonAction="filteringButtonAction"
        :restaurantList="restaurantData"
        :restaurantCount="restaurantCount"
        :getSearchKeyword="getSearchKeyword"
        :setSearchKeyword="setSearchKeyword"
        :searchButtonAction="searchButtonAction"
        :infiniteHandler="infiniteHandler"
        :offset="offset"
      />
    </section>
    <Loading v-else-if="loading" />
  </b-container>
</template>

<script>
import Loading from "@/components/Atoms/Loading.vue";
import SearchBar from "@/components/Molecules/SearchBar.vue";
import List from "@/components/Templates/RestaurantList/List.vue";
import { searchRestaurantList } from "@/plugins/searchRestaurantList.js";

export default {
  components: {
    Loading,
    SearchBar,
    List,
  },
  data() {
    return {
      query: {},
      restaurantData: [],
      restaurantCount: 0,
      keyword: "",
      loading: true,
      offset: 0,
    };
  },
  methods: {
    // ページ最下部に達した時の処理
    infiniteHandler($state) {
      setTimeout(() => {
        var searchQuery = {
          offset: this.offset,
          keyword: this.keyword,
          lat: this.query.lat,
          lng: this.query.lng,
        };
        this.searchRestaurantList(searchQuery).then((res) => {
          if (res.length) {
            res.forEach((element) => {
              this.restaurantData.push(element);
            });
            $state.loaded();
          } else {
            $state.complete();
          }
        });
      }, 500);
    },
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
      // 入力フォームの検索ボタンを押したとき
      // 新たなURLクエリパラメータを作成しURLを置換
      // キーワードがURLクエリパラメータと一致していた場合、検索しない
      if (this.keyword != this.$route.query.keyword) {
        this.$router.push({
          path: "RestaurantList",
          query: {
            keyword: this.keyword,
            lat: this.query.lat,
            lng: this.query.lng,
          },
        });
      }
    },
    async searchRestaurantList(searchQuery) {
      // 店舗検索処理
      return new Promise((resolve) => {
        searchRestaurantList(searchQuery).then((res) => {
          this.offset += 5;
          resolve(res);
        });
      });
    },
  },
  mounted() {
    // URLパラメータ取得
    this.query = this.$route.query;
    // 検索フォームに前画面のキーワードを代入
    this.keyword = this.query.keyword;
    // 検索処理を実行
    var searchQuery = {
      offset: this.offset,
      keyword: this.keyword,
      lat: this.query.lat,
      lng: this.query.lng,
    };
    this.searchRestaurantList(searchQuery).then((res) => {
      // 検索結果を代入
      this.restaurantData = res;
      this.loading = false;
    });
  },
  watch: {
    $route() {
      this.loading = true;
      // 店舗リストを空にする
      this.restaurantData = [];
      // 表示した店舗数を0にする
      this.offset = 0;
      // 検索処理を実行
      var searchQuery = {
        offset: this.offset,
        keyword: this.keyword,
        lat: this.query.lat,
        lng: this.query.lng,
      };
      this.searchRestaurantList(searchQuery).then((res) => {
        // 新しい検索結果を代入
        this.restaurantData = res;
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 95%;
  margin: 0 auto;
}

.search-bar {
  position: -webkit-sticky;
  position: sticky;
  top: -1px;
  z-index: 100;
  background-color: white;
}
</style>