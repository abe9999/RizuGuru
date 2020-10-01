<template>
  <div class="wrapper">
    <div v-if="!isFiltering">
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

    <div v-else>
      <Filtering
        :searchButtonAction="filteringSearchButtonAction"
        :filteringItemData="filtering"
        :getter="getFilterValue"
        :setter="setFilterValue"
        :tagSwitcher="tagStateSwitcher"
      />
    </div>
  </div>
</template>

<script>
import List from "@/components/Templates/RestaurantList/List.vue";
import Filtering from "@/components/Templates/RestaurantList/Filtering.vue";
import { searchRestaurantList } from "@/plugins/searchRestaurantList.js";
import { getTagsList } from "@/plugins/getTagsList.js";

export default {
  components: {
    List,
    Filtering,
  },
  data() {
    return {
      isFiltering: false,
      restaurantData: [],
      restaurantCount: null,
      keyword: "",
      loading: true,
      filtering: {
        keyword: {
          value: "",
        },
        station: {
          propertyName: "station",
          displayName: "駅",
          icon: require("@/assets/images/地図マーカーのアイコン素材1.png"),
          required: false,
          placeholder: "池袋駅",
          value: "",
        },
        genre: {
          propertyName: "genre",
          displayName: "ジャンル",
          icon: require("@/assets/images/ご飯のアイコン.png"),
          required: false,
          placeholder: "ラーメン",
          value: "",
        },
        distance: {
          propertyName: "distance",
          displayName: "現在地からの距離",
          icon: require("@/assets/images/歩くアイコン.png"),
          interval: 100,
          min: 0,
          max: 1500,
          value: 0,
        },
        budget: {
          propertyName: "budget",
          displayName: "予算",
          icon: require("@/assets/images/キュートながま口財布アイコン.png"),
          interval: 100,
          min: 0,
          max: 1000,
          value: [300, 700],
        },
        tags: {
          propertyName: "tag",
          displayName: "こだわり",
          icon: require("@/assets/images/タグアイコン2.png"),
          value: [],
        },
      },
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
      this.isFiltering = !this.isFiltering;
    },
    filteringSearchButtonAction() {
      var fil = this.filtering;
      var keyword = fil.keyword.value;
      var station = fil.station.value;
      var genre = fil.genre.value;
      // var distance = fil.distance.value;
      var budget = [fil.budget.value[0], fil.budget.value[1]];
      var tags = fil.tags.value.filter((x) => x.state == true).map((x) => x.id);
      searchRestaurantList(
        keyword,
        station,
        genre,
        budget[0],
        budget[1],
        tags
      ).then((res) => {
        this.restaurantData = res;
      });
      this.isFiltering = !this.isFiltering;
    },
    getFilterValue(propertyName) {
      return this.filtering[`${propertyName}`].value;
    },
    setFilterValue(obj) {
      this.filtering[`${obj.propertyName}`].value = obj.value;
    },
    tagStateSwitcher(index) {
      this.filtering.tags.value[index].state = !this.filtering.tags.value[index]
        .state;
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
    var query = this.$route.query;
    searchRestaurantList(query.keyword, query.lat, query.lng).then((res) => {
      this.restaurantData = res;
      this.loading = !this.loading;
    });

    // DBに存在するタグを取得
    getTagsList().then((res) => {
      this.filtering.tags.value = res;
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