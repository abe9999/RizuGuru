<template>
  <div class="wrapper">
    <div v-if="!isFiltering">
      <b-container class="d-flex justifiy-content-center" fluid>
        <List
          :filteringButtonAction="filteringButtonAction"
          :restaurantList="restaurantData"
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
        :searchButtonAction="searchButtonActionFromFiltering"
        :filteringItemData="filtering"
        :getter="getFilterValue"
        :setter="setFilterValue"
        :tagSwitcher="tagStateSwitcher"
      />
    </div>
  </div>
</template>

<script>
import Enumerable from "linq";
import List from "@/components/Templates/RestaurantList/List.vue";
import Filtering from "@/components/Templates/RestaurantList/Filtering.vue";
import { searchRestaurantList } from "@/plugins/searchRestaurantList.js";

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
    filteringButtonAction() {
      this.isFiltering = !this.isFiltering;
    },
    searchButtonActionFromFiltering() {
      searchRestaurantList(
        Enumerable.from(this.filtering)
          .select((x) => x.value.value)
          .toArray()
      ).then((res) => {
        this.restaurantData = res;
        this.loading = !this.loading;
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
      this.filtering.tags.states[index].value = !this.filtering.tags.states[
        index
      ].value;
    },
  },
  mounted() {
    this.filtering.keyword.value = this.$store.getters["Search/states"].keyword;
    searchRestaurantList(this.filtering.keyword.value).then((res) => {
      this.restaurantData = res;
      this.loading = !this.loading;
    });

    this.$axios
      .get(`https://func-rizuguru.azurewebsites.net/api/GetTag?`)
      .then((res) => {
        this.filtering.tags.states = res.data
          .filter((e) => e.id > 10)
          .map((e) => {
            e.state = false;
            return e;
          });
      });
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