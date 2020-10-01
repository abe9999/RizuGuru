<template>
  <div class="wrapper">
    <div>
      <b-container class="d-flex justifiy-content-center" fluid>
        <List
          :filteringButtonAction="filteringButtonAction"
          :restaurantList="restaurantList"
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
import Enumerable from "linq";
import List from "@/components/Templates/RestaurantList/List.vue";
import { searchRestaurantList } from "@/plugins/searchRestaurantList.js";

export default {
  components: {
    List,
  },
  data() {
    return {
      query: [],
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
        query: {
          keyword: this.$route.query.keyword,
          lat: this.$route.query.lat,
          lng: this.$route.query.lng,
        },
      });
    },
    searchButtonAction() {
      // 現在地と検索キーワードを元に検索結果を表示
      var query = this.$route.query;
      searchRestaurantList(this.keyword, query.lat, query.lng).then((res) => {
        this.restaurantData = res;
      });
    },
  },
  created() {
    // 現在地と検索キーワードを元に検索結果を表示
    var query = Enumerable.from(this.$route.query)
      .select((x) => x.value)
      .toArray();
    console.log(query);
    searchRestaurantList(...query).then((res) => {
      this.restaurantData = res;
      this.loading = !this.loading;
    });
    // 検索フォームに前画面のキーワードを代入
    this.keyword = query.keyword;
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
  margin-left: 50px;
  margin-top: 20px;
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