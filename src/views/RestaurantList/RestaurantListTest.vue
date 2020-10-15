<template>
  <b-container class="d-flex justifiy-content-center" fluid>
    <section class="wrapper" v-if="!loading">
      <h1>ページネーションテスト</h1>
      <List
        :filteringButtonAction="filteringButtonAction"
        :restaurantList="restaurantList"
        :restaurantCount="restaurantCount"
        :getSearchKeyword="getSearchKeyword"
        :setSearchKeyword="setSearchKeyword"
        :searchButtonAction="searchButtonAction"
      />
      <div class="next-button">
        <b-button variant="success" @click="searchRestaurantList"
          >次を5件を読み込む</b-button
        >
      </div>
    </section>
    <Loading v-else-if="loading" />
  </b-container>
</template>

<script>
import List from "@/components/Templates/RestaurantList/List.vue";
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
      offset: 5,
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
      this.loading = false;
      var query = this.query;
      query.offset = this.offset;
      searchRestaurantList(this.query).then((res) => {
        res.forEach((element) => {
          this.restaurantData.push(element);
        });
        // this.restaurantCount = res.length;
        this.offset += res.length;
        // ローディングのくるくるを非表示に
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
.next-button {
  text-align: center;
}

.wrapper {
  width: 100%;
  margin: 10px auto 10px auto;
}
</style>