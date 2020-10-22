<template>
  <div class="home">
    <h1>
      <div class="logo">
        <img :src="imgPath" alt />
      </div>
    </h1>
    <div id="app">
      <p>リーズナブルなグルメアプリ</p>
    </div>
    <div
      class="button"
      v-if="
        this.$store.getters['CurrentLocation/getCurrentLocation'].lat ||
        this.$store.getters['CurrentLocation/getCurrentLocation'].lng
      "
    >
      <b-button variant="success" @click="searchByCurrentLocationBtn()"
        >現在地から探す</b-button
      >
    </div>
    <div class="search">
      <b-input-group class="mb-2">
        <b-form-input
          type="search"
          v-model="keyword"
          placeholder="駅名やジャンルから検索"
          @keydown.enter="searchByTextForm()"
        />
        <b-input-group-prepend is-text class="icon" @click="searchByTextForm()">
          <b-icon icon="search"></b-icon>
        </b-input-group-prepend>
      </b-input-group>
    </div>
  </div>
</template>

<script>
import searchQuery from "@/plugins/class/searchQueryClass.js";
import { getCurrentLocation } from "@/plugins/getCurrentLocation.js";
export default {
  data() {
    return {
      imgPath: require("@/assets/images/ロゴ.jpg"),
      keyword: "",
    };
  },
  mounted() {
    getCurrentLocation().then((res) => {
      this.$store.dispatch("CurrentLocation/setCurrentLocation", res);
    });
  },
  methods: {
    searchByCurrentLocationBtn() {
      var currentLocation = this.$store.getters[
        "CurrentLocation/getCurrentLocation"
      ];
      if (!currentLocation.lat) {
        // alert("この端末では位置情報が取得できません");
        this.$router.push({
          name: "RestaurantList",
          query: new searchQuery({
            keyword: "",
            lat: currentLocation.lat,
            lng: currentLocation.lng,
          }),
        });
      } else {
        this.$router.push({
          name: "RestaurantList",
          query: new searchQuery({
            keyword: "",
            lat: currentLocation.lat,
            lng: currentLocation.lng,
          }),
        });
      }
    },
    searchByTextForm() {
      var currentLocation = this.$store.getters[
        "CurrentLocation/getCurrentLocation"
      ];
      this.$router.push({
        name: "RestaurantList",
        query: new searchQuery({
          keyword: this.keyword,
          lat: currentLocation.lat,
          lng: currentLocation.lng,
        }),
      });
    },
  },
};
</script>

<style scoped>
input {
  font-size: 16px;
}

.home {
  width: 90%;
  margin-top: 5%;
  margin: 0 auto;
  text-align: center;
}

.button {
  margin-bottom: 20px;
}

.search-input {
  width: 200px;
}

.mb-2 {
  width: 80%;
  max-width: 500px;
  margin: 0 auto;
}

.icon {
  color: gray;
  cursor: pointer;
}
</style>