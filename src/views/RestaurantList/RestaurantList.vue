<template>
  <b-container class="d-flex justifiy-content-center" fluid>
    <section class="wrapper" v-if="!loading">
      <SearchBar
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
        this.searchRestaurantList().then((res) => {
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
      // 入力フォームの検索ボタンをしたときの処理
      this.$router.push({
        name: "RestaurantList",
        query: {
          keyword: this.keyword,
          lat: this.query.lat,
          lng: this.query.lng,
        },
        force: true,
      });
    },
    async searchRestaurantList() {
      // 店舗検索処理
      return new Promise((resolve) => {
        var query = this.query;
        query.offset = this.offset;
        var result = [];
        searchRestaurantList(query).then((res) => {
          res.forEach((element) => {
            result.push(element);
          });
          this.offset += 5;
          resolve(result);
        });
      });
    },
  },
  mounted() {
    this.query = this.$route.query;
    // 検索フォームに前画面のキーワードを代入
    this.keyword = this.query.keyword;
    // 検索処理を実行
    this.searchRestaurantList().then((res) => {
      res.forEach((element) => {
        this.restaurantData.push(element);
      });
      // ローディングアイコンを非表示にする
      this.loading = false;
    });
  },
  watch: {
    // 入力フォームの検索ボタンを押したときクエリを保持したまま画面リロードする
    $route() {
      this.$router.go({ path: this.$router.currentRoute.path, force: true });
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 95%;
  margin: 0 auto;
}
</style>