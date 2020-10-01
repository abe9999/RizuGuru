<template>
  <div class="wrapper">
    <Filtering
      :searchButtonAction="filteringSearchButtonAction"
      :filteringItemData="filtering"
      :getter="getFilterValue"
      :setter="setFilterValue"
      :tagSwitcher="tagStateSwitcher"
    />
  </div>
</template>

<script>
import Filtering from "@/components/Templates/RestaurantList/Filtering.vue";
import { getTagsList } from "@/plugins/getTagsList.js";
export default {
  components: {
    Filtering,
  },
  data() {
    return {
      filtering: {
        keyword: {
          value: this.$route.query.keyword,
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
    filteringSearchButtonAction() {
      var query = this.$route.query;
      var fil = this.filtering;
      this.$router.push({
        name: "RestaurantList",
        query: {
          keyword: query.keyword,
          lat: query.lat,
          lng: query.lng,
          station: fil.station.value,
          genre: fil.genre.value,
          distance: fil.distance.value,
          minPrice: fil.budget.value[0],
          maxPrice: fil.budget.value[1],
          tag: fil.tags.value.filter((x) => x.state == true).map((x) => x.id),
        },
      });
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
  },
  created() {
    // DBに存在するタグを取得
    getTagsList().then((res) => {
      this.filtering.tags.value = res;
    });
    var query = this.$route.query;
    console.log(query);
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  margin: 0 auto;
}
</style>