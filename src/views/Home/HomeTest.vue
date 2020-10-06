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
      <vue-tags-input
        v-model="tag"
        :tags="tags"
        :autocomplete-items="autocompleteItems"
        :add-only-from-autocomplete="true"
        placeholder="駅名やジャンルから検索"
        @tags-changed="update"
      />
      <!-- <b-input-group-prepend is-text class="icon" @click="searchByTextForm()">
          <b-icon icon="search"></b-icon>
        </b-input-group-prepend> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { getCurrentLocation } from "@/plugins/getCurrentLocation.js";
import VueTagsInput from "@johmun/vue-tags-input";
import { getStation } from "@/plugins/getStation.js";

export default {
  components: {
    VueTagsInput,
  },
  data() {
    return {
      imgPath: require("@/assets/images/ロゴ.jpg"),
      currentLocation: {},
      keyword: "",
      tag: "",
      tags: [],
      autocompleteItems: [],
      debounce: null,
    };
  },
  mounted() {
    getCurrentLocation().then((res) => (this.currentLocation = res));
    var element = document.querySelector("input");
    element.setAttribute("v-on:keydown.enter", "searchByTextForm()");
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
          keyword: this.tags[0].text,
          lat: this.currentLocation.lat,
          lng: this.currentLocation.lng,
        },
      });
    },
    update(newTags) {
      this.autocompleteItems = [];
      this.tags = newTags;
    },
    initItems() {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        getStation(this.tag)
          .then((response) => {
            var stations = response.splice(0, 5);
            this.autocompleteItems = stations.map((a) => {
              return { text: a.name };
            });
          })
          .catch(() => console.warn("Oh. Something went wrong"));
      }, 600);
    },
  },
  watch: {
    tag: "initItems",
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

.vue-tags-input {
  margin: 0 auto;
}

.button {
  margin-bottom: 20px;
}

.icon {
  color: gray;
  cursor: pointer;
}
</style>