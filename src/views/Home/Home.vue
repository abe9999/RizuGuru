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
      <router-link to="/RestaurantList/CurrentLocation">
        <b-button variant="success">現在地から探す</b-button>
      </router-link>
    </div>
    <div class="search">
      <b-input-group class="mb-2">
        <b-form-input
          type="search"
          v-model="setKeyword"
          @keydown.enter="search"
          placeholder="駅名やジャンルから検索"
        ></b-form-input>
        <b-input-group-prepend is-text>
          <router-link to="/RestaurantList/Search/" class="icon">
            <b-icon icon="search"></b-icon>
          </router-link>
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
  mounted: function () {
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
    search: (event) => {
      if (event.keyCode !== 13) return;
      window.location.href = "/#/RestaurantList/Search/"
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
}
</style>