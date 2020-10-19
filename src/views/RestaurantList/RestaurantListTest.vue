<template>
  <b-container class="d-flex justifiy-content-center" fluid>
    <section class="wrapper" v-if="!loading">
      <!-- <h1>無限スクロールテスト</h1> -->
      <List
        :filteringButtonAction="filteringButtonAction"
        :restaurantList="restaurantList"
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
import List from "@/components/Templates/RestaurantList/ListTest.vue";
import Loading from "@/components/Atoms/Loading.vue";
import { searchRestaurantList } from "@/plugins/searchRestaurantList.js";

export default {
  components: {
    List,
    Loading,
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
      this.query.keyword = this.keyword;
      this.searchRestaurantList();
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
      this.loading = false;
    });
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
</style>