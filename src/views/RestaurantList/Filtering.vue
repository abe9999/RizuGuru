<template>
  <div class="wrapper">
    <Filtering
      :searchButtonAction="filteringSearchButtonAction"
      :filteringItemData="filtering"
      :getter="getFilterValue"
      :setter="setFilterValue"
      :tagSwitcher="tagStateSwitcher"
      v-if="!loading"
    />
    <img
      class="loading"
      src="@/assets/images/loading.gif"
      v-else-if="loading"
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
      loading: true,
      filtering: {
        query: {},
        keyword: {
          value: this.$route.query.keyword,
        },
        station: {
          propertyName: "station",
          displayName: "駅",
          icon: require("@/assets/images/地図マーカーのアイコン素材1.png"),
          required: false,
          placeholder: "四ツ谷駅",
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
          interval: 5000,
          min: 0,
          max: 30000,
          value: 5000,
        },
        budget: {
          propertyName: "budget",
          displayName: "予算",
          icon: require("@/assets/images/キュートながま口財布アイコン.png"),
          interval: 100,
          min: 0,
          max: 1000,
          value: [0, 1000],
        },
        tagsId: {
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
      var fil = this.filtering;
      this.$router.push({
        name: "RestaurantList",
        query: {
          keyword: this.query.keyword,
          lat: this.query.lat,
          lng: this.query.lng,
          station: fil.station.value,
          genre: fil.genre.value,
          distance: fil.distance.value,
          minPrice: fil.budget.value[0],
          maxPrice: fil.budget.value[1],
          tagsId: [fil.tagsId.value
            .filter((x) => x.state == true)
            .map((x) => x.id)],
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
      this.filtering.tagsId.value[index].state = !this.filtering.tagsId.value[
        index
      ].state;
    },
  },
  mounted() {
    this.query = this.$route.query;
    // DBに存在するタグを取得
    getTagsList().then((res) => {
      this.filtering.tagsId.value = res;
      var keys = Object.keys(this.query);
      keys.forEach((key) => {
        if (key == "minPrice") {
          this.filtering.budget.value[0] = this.query[key];
        } else if (key == "maxPrice") {
          this.filtering.budget.value[1] = this.query[key];
        } else if (key != "tagsId") {
          if (this.filtering[key]) {
            this.filtering[key].value = this.query[key];
          }
        }
      });
      this.loading = false;
    });
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  margin: 20px auto 0 auto;
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