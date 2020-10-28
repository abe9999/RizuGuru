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
        :searchQuery="this.$route.query"
        :searchKeywordTagAction="searchKeywordTagAction"
      />
      <List
        :filteringButtonAction="filteringButtonAction"
        :restaurantList="restaurantData"
        :restaurantCount="restaurantCount"
        :getSearchKeyword="getSearchKeyword"
        :setSearchKeyword="setSearchKeyword"
        :searchButtonAction="searchButtonAction"
        :infiniteHandler="infiniteHandler"
      />
    </section>
    <Loading v-else-if="loading" />
  </b-container>
</template>

<script>
import searchQuery from "@/utils/class/searchQueryClass.js";
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
        this.searchRestaurantList(
          new searchQuery(this.$route.query),
          this.offset
        ).then((res) => {
          if (res.length) {
            this.restaurantData.push(...res);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
      }, 300);
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
        query: new searchQuery(this.$route.query),
      });
    },
    searchButtonAction() {
      // 入力フォームの検索ボタンを押したとき
      // 新たなURLクエリパラメータを作成しURLを置換するが、
      // キーワードがURLクエリパラメータと一致していた場合は検索しない
      this.loading = true;
      if (this.keyword != this.$route.query.keyword) {
        this.$router.push({
          path: "RestaurantList",
          query: new searchQuery({ keyword: this.keyword }, this.$route.query),
        });
      } else {
        setTimeout(() => {
          this.loading = false;
        }, 300);
      }
    },
    searchKeywordTagAction(...args) {
      var query = Object.assign({}, this.$route.query);
      switch (args.length) {
        case 1:
          if (args[0] == "price") {
            delete query["minPrice"];
            delete query["maxPrice"];
          } else {
            delete query[args[0]];
          }
          break;
        case 2:
          query.tagsId = query.tagsId
            .split(",")
            .filter((x) => x != args[1])
            .join(",");
          break;
      }
      this.$router.push({
        path: "RestaurantList",
        query: new searchQuery(query),
      });
    },
    async searchRestaurantList(searchQuery, offset) {
      // 店舗検索処理
      return new Promise((resolve) => {
        searchRestaurantList({
          searchQuery: searchQuery,
          offset: offset,
        }).then((res) => {
          this.offset += res.length;
          resolve(res);
        });
      });
    },
  },
  mounted() {
    // URLパラメータ取得
    // 検索フォームに前画面のキーワードを代入
    this.keyword = this.$route.query.keyword;
    // 検索処理を実行
    this.searchRestaurantList(
      new searchQuery(this.$route.query),
      this.offset
    ).then((res) => {
      // 検索結果を代入
      this.restaurantData.push(...res);
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
      this.searchRestaurantList(
        new searchQuery(this.$route.query),
        this.offset
      ).then((res) => {
        // 新しい検索結果を代入
        this.restaurantData.push(...res);
        this.loading = false;
      });
      this.keyword = this.$route.query.keyword;
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