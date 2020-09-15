<template>
  <div class="list-wrapper">
    <SearchBar />
    <hr />
    <ListCounter :countValue="restaurantCount" />
    <div v-for="(data, index) in restaurantData" :key="index">
      <b-container class="d-flex justify-content-center" fluid>
        <ListDetail :restaurantData="data" />
      </b-container>
      <hr />
    </div>
  </div>
</template>

<script>
import ListDetail from "@/components/RestaurantList/ListDetail/Main.vue";
import SearchBar from "@/components/RestaurantList/ListDetail/SearchBar.vue";
import ListCounter from "@/components/RestaurantList/ListDetail/ListCounter.vue";
import Enumerable from "linq";

export default {
  data() {
    return {
      restaurantCount: Number,
      restaurantData: Object,
      statesData: Object,
      currentLat: 0,
      currentLng: 0,
      restaurantsPos: [],
      keyword: "",
    };
  },
  components: {
    SearchBar,
    ListCounter,
    ListDetail,
  },
  methods: {
    geoDistance(lat1, lng1, lat2, lng2, precision) {
      // 引数precision は小数点以下の桁数（距離の精度）
      var distance = 0;
      if (Math.abs(lat1 - lat2) < 0.00001 && Math.abs(lng1 - lng2) < 0.00001) {
        distance = 0;
      } else {
        lat1 = (lat1 * Math.PI) / 180;
        lng1 = (lng1 * Math.PI) / 180;
        lat2 = (lat2 * Math.PI) / 180;
        lng2 = (lng2 * Math.PI) / 180;

        var A = 6378140;
        var B = 6356755;
        var F = (A - B) / A;

        var P1 = Math.atan((B / A) * Math.tan(lat1));
        var P2 = Math.atan((B / A) * Math.tan(lat2));

        var X = Math.acos(
          Math.sin(P1) * Math.sin(P2) +
            Math.cos(P1) * Math.cos(P2) * Math.cos(lng1 - lng2)
        );
        var L =
          (F / 8) *
          (((Math.sin(X) - X) * Math.pow(Math.sin(P1) + Math.sin(P2), 2)) /
            Math.pow(Math.cos(X / 2), 2) -
            ((Math.sin(X) - X) * Math.pow(Math.sin(P1) - Math.sin(P2), 2)) /
              Math.pow(Math.sin(X), 2));

        distance = A * (X + L);
        var decimal_no = Math.pow(10, precision);
        distance = Math.round((decimal_no * distance) / 1) / decimal_no; // kmに変換するときは(1000で割る)
      }
      return distance;
    },
  },
  mounted() {
    this.statesData = this.$store.getters["Filtering/states"];
    var currentPos = this.$store.getters["Location/states"];
    this.currentLat = currentPos.lat;
    this.currentLng = currentPos.lng;
    this.keyword = this.$store.getters["Search/states"].keyword;

    this.$axios
      .get("https://func-rizuguru.azurewebsites.net/api/GetAllDetail")
      .then((res) => {
        this.restaurantData = res.data;
        for (var i = 0; i < this.restaurantData.length; i++) {
          this.restaurantsPos[i] = {
            id: this.restaurantData[i].id,
            lat: this.restaurantData[i].latitude,
            lng: this.restaurantData[i].longitude,
          };
        }
        for (var j = 0; j < this.restaurantData.length; j++) {
          var distance = this.geoDistance(
            this.currentLat,
            this.currentLng,
            this.restaurantsPos[j].lat,
            this.restaurantsPos[j].lng,
            0
          );
          this.restaurantData[j].distance = distance;
        }

        // 検索条件が入力されていた場合の処理
        if (this.keyword != "") {
          this.restaurantData = Enumerable.from(this.restaurantData)
            .where(
              (x) =>
                x.name.includes(this.keyword) == true ||
                x.category.includes(this.keyword) == true ||
                x.access.find((x) => x.includes(this.keyword)) != undefined
            )
            .toArray();
        } else {
          this.restaurantData = Enumerable.from(this.restaurantData)
            .orderBy((x) => x.distance)
            .toArray();
        }

        // 絞り込みを行っていた場合の処理
        if (this.statesData.isFiltered) {
          this.restaurantData = Enumerable.from(this.restaurantData)
            .where((x) => x.distance <= this.statesData.distance.value)
            .toArray();
        }

        // 検索結果件数の取得処理
        this.restaurantCount = this.restaurantData.length;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
</style>