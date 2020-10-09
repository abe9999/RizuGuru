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

    <div>
      <form>
        <input ref="file" class="file-button" type="file" @change="upload" />
        <img class="user-photo-image" :src="image" />
      </form>
    </div>
  </div>
</template>

<script>
import { getCurrentLocation } from "@/plugins/getCurrentLocation.js";
export default {
  data() {
    return {
      imgPath: require("@/assets/images/ロゴ.jpg"),
      currentLocation: {},
      keyword: "",
      image: "",
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

    async upload(event) {
      const files = event.target.files || event.dataTransfer.files;
      const file = files[0];

      if (this.checkFile(file)) {
        this.image = await this.getBase64(file);
        console.log(this.image);
      }
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    checkFile(file) {
      let result = true;
      const SIZE_LIMIT = 5000000; // 5MB
      // キャンセルしたら処理中断
      if (!file) {
        result = false;
      }
      // jpeg か png 関連ファイル以外は受付けない
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        result = false;
      }
      // 上限サイズより大きければ受付けない
      if (file.size > SIZE_LIMIT) {
        result = false;
      }
      return result;
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