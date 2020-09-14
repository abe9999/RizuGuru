<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col>
          <InputTitle :individuality="individuality" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <span style="color:red">{{ errorMessage }}</span>
          <b-form-input type="search" v-model="keyword" :placeholder="individuality.placeholder" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import InputTitle from "@/components/RestaurantList/Filtering/InputTitle.vue";
export default {
  components: {
    InputTitle,
  },
  data() {
    return {
      searchWord: "searchWord",
      errorMessage: "",
    };
  },
  props: {
    type: {
      name: String,
      required: true,
    },
    individuality: {
      data: Object,
      required: true,
    },
    state: {
      value: String,
      required: true,
    },
  },
  watch: {
    searchWord() {
      if (this.searchWord.includes(" ") || this.searchWord.includes("　")) {
        this.errorMessage = "検索キーワードは複数入力しないでください。";
      } else {
        this.errorMessage = "";
      }
    },
  },
  computed: {
    // storeのゲッター・セッター
    keyword: {
      get() {
        return this.state;
      },
      set(keyword) {
        this.$emit("setKeyword", this.type, keyword);
      },
    },
  },
};
</script>

<style scoped>
input {
  width: 100%;
  height: 30px;
  margin-bottom: 15px;
  border: 1.5px solid gray;
  border-radius: 3px;
}

.icon {
  width: 20px;
  margin-right: 5px;
  vertical-align: middle;
}
</style>