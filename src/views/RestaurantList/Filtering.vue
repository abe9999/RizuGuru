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
    <Loading v-else-if="loading" />
  </div>
</template>

<script>
import searchQuery from "@/utils/class/searchQueryClass.js";
import Filtering from "@/components/Templates/RestaurantList/Filtering.vue";
import Loading from "@/components/Atoms/Loading.vue";
import { getTagsList } from "@/plugins/getTagsList.js";
export default {
  components: {
    Filtering,
    Loading,
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
          placeholder: "四ツ谷",
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
          marks: {
            100: "100",
            300: "300",
            500: "500",
            800: "800",
            1000: "1000",
            1500: "1500",
            2000: "2000",
            2500: "上限なし",
          },
          min: 100,
          max: 2500,
          value: 2500,
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
      this.$router.push({
        name: "RestaurantList",
        query: new searchQuery(
          {
            keyword: this.filtering.keyword.value,
            lat: this.$route.query.lat,
            lng: this.$route.query.lng,
            station: this.filtering.station.value,
            genre: this.filtering.genre.value,
            distance:
              // 現在地からの距離を「制限なし」に設定していた場合は値を空にする
              // スライダーの見た目を合わせるために「制限なし」は2500にする必要がある
              this.filtering.distance.value == 2500
                ? ""
                : this.filtering.distance.value,
            minPrice: this.filtering.budget.value[0],
            maxPrice: this.filtering.budget.value[1],
            tagsId: this.filtering.tagsId.value
              .filter((x) => x.state == true)
              .map((x) => x.id)
              .join(","),
          },
          this.$route.query
        ),
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
        switch (key) {
          case "distance":
            if (this.query[key] == "") {
              this.filtering.distance.value = 2500;
            } else {
              this.filtering.distance.value = this.query[key];
            }
            break;
          case "minPrice":
            this.filtering.budget.value[0] = this.query[key];
            break;
          case "maxPrice":
            this.filtering.budget.value[1] = this.query[key];
            break;
          case "tagsId":
            // タグを既に選択していた場合、該当するタグをアクティブにする
            if (this.query[key] != "") {
              this.query[key] = this.query[key].split(",").forEach((tagId) => {
                var index = this.filtering.tagsId.value.findIndex(
                  (x) => x.id == tagId
                );
                this.filtering.tagsId.value[index].state = true;
              });
            }
            break;
          default:
            if (this.filtering[key]) {
              this.filtering[key].value = this.query[key];
            }
            break;
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