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
    <div class="button">
      <b-button variant="success" @click="searchByCurrentLocationBtn()"
        >現在地から探す</b-button
      >
    </div>
    <div class="search">
      <b-input-group class="mb-2">
        <b-form-input
          id="input-area"
          type="search"
          v-model="keyword"
          list="my-list-id"
          placeholder="駅名やジャンルから検索"
          @keydown.enter="searchByTextForm()"
          @input="searchStation()"
        />
        <b-input-group-prepend is-text class="icon" @click="searchByTextForm()">
          <b-icon icon="search"></b-icon>
        </b-input-group-prepend>
      </b-input-group>
      <datalist id="my-list-id">
        <option v-for="(station, index) in stations" :key="index">
          {{ station.name }}
        </option>
      </datalist>
      <!-- <VueSuggestInput
        v-model="selected"
        :items="stationNames"
        :max-suggest="5"
        @input="searchStation()"
      >
      </VueSuggestInput> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { getCurrentLocation } from "@/plugins/getCurrentLocation.js";
import VueSuggestInput from "vue-suggest-input";
import "vue-suggest-input/dist/vue-suggest-input.css";

export default {
  components: {
    VueSuggestInput,
  },
  data() {
    return {
      imgPath: require("@/assets/images/ロゴ.jpg"),
      currentLocation: {},
      keyword: "",
      selected: "",
      stations: [],
      stationNames: [],
    };
  },
  mounted() {
    getCurrentLocation().then((res) => (this.currentLocation = res));
  },
  methods: {
    searchByCurrentLocationBtn() {
      if (!this.currentLocation.lat) {
        alert("この端末では位置情報が取得できません");
      } else {
        this.$router.push({
          name: "RestaurantList",
          query: {
            keyword: this.keyword,
            lat: this.currentLocation.lat,
            lng: this.currentLocation.lng,
          },
        });
      }
    },
    searchByTextForm() {
      this.$router.push({
        name: "RestaurantList",
        query: {
          keyword: this.keyword,
          lat: this.currentLocation.lat,
          lng: this.currentLocation.lng,
        },
      });
    },
    // async searchStation() {
    //   var searchWord = document.querySelector(".search input").value;
    //   if (searchWord == 0) {
    //     this.stationNames = [];
    //   } else {
    //     this.$axios
    //       .get(
    //         `https://func-rizuguru.azurewebsites.net/api/GetStation?word=${searchWord}`
    //       )
    //       .then((res) => {
    //         this.stationNames = res.data.map((e) => e.name);
    //       });
    //   }
    // },
    async searchStation() {
      var searchWord = document.getElementById("input-area").value;
      if (searchWord.length == 0) {
        this.stations = [];
      } else {
        await this.$axios
          .get(
            `https://func-rizuguru.azurewebsites.net/api/GetStation?word=${searchWord}`
          )
          .then((res) => {
            this.stations = res.data.splice(0, 5);
          });
      }
    },
  },
};
</script>

<style scoped>
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