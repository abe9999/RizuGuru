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
      <b-button variant="success" @click="search()">現在地から探す</b-button>
    </div>
    <div class="search">
      <b-input-group class="mb-2">
        <b-form-input
          type="search"
          v-model="setKeyword"
          placeholder="駅名やジャンルから検索"
          @keydown.enter="search()"
        />
        <b-input-group-prepend is-text class="icon" @click="search()">
          <b-icon icon="search"></b-icon>
        </b-input-group-prepend>
      </b-input-group>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      imgPath: require("@/assets/images/ロゴ.jpg"),
      currentLocation: {},
      keyword: "",
    };
  },
  mounted() {
    if (navigator.geolocation) {
      // 現在地の取得
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // 緯度経度の取得
          this.currentLocation.lat = position.coords.latitude;
          this.currentLocation.lng = position.coords.longitude;
          this.$store.dispatch("Location/setLocation", {
            value: this.currentLocation,
          });
        }.bind(this),
        function () {
          alert("位置情報取得に失敗しました");
        }
      );
    } else {
      alert("この端末では位置情報が取得できません");
    }
  },
  computed: {
    setKeyword: {
      get() {
        return this.$store.getters["Search/states"].keyword;
      },
      set(value) {
        this.$store.dispatch("Search/setKeyword", value);
      },
    },
  },
  methods: {
    search() {
      this.$router.push("/RestaurantList");
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