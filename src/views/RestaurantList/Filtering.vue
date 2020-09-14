<template>
  <b-container class="main">
    <b-row>
      <b-col>
        <!-- ページタイトル -->
        <Headline headline="絞り込む" />
      </b-col>
    </b-row>
    <b-row>
      <b-col class="content">
        <!-- 駅キーワード入力欄 -->
        <TextInput
          type="station"
          :individuality="textInput.station"
          :state="states.station"
          @setKeyword="setKeyword"
        />
        <!-- カテゴリーキーワード入力欄 -->
        <TextInput
          type="category"
          :individuality="textInput.category"
          :state="states.category"
          @setKeyword="setKeyword"
        />
        <!-- 現在地からの距離選択欄 -->
        <RangeInput
          type="distance"
          :individuality="rangeInput.distance"
          :state="states.distance"
          @setRange="setRange"
        />
        <!-- 予算選択欄 -->
        <RangeInput
          type="budget"
          :individuality="rangeInput.budget"
          :state="states.budget"
          @setRange="setRange"
        />
        <!-- こだわりタグ選択欄 -->
        <TagsInput
          :individuality="tagsInput.obsession"
          :states="states.obsessions"
          @tagToggle="tagToggle"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <!-- 検索ボタン -->
        <SearchButton action="filtered" @clickAction="filtered" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Headline from "@/components/RestaurantList/Filtering/Headline.vue";
import TextInput from "@/components/RestaurantList/Filtering/TextInput.vue";
import RangeInput from "@/components/RestaurantList/Filtering/RangeInput.vue";
import TagsInput from "@/components/RestaurantList/Filtering/TagsInput.vue";
import SearchButton from "@/components/RestaurantList/Filtering/SearchButton.vue";

export default {
  components: {
    Headline,
    TextInput,
    RangeInput,
    TagsInput,
    SearchButton,
  },
  data() {
    return {
      textInput: {
        station: {
          title: "駅",
          placeholder: "池袋駅",
          icon: require("@/assets/images/地図マーカーのアイコン素材1.png"),
        },
        category: {
          title: "ジャンル",
          placeholder: "カレー",
          icon: require("@/assets/images/ご飯のアイコン.png"),
        },
      },
      rangeInput: {
        distance: {
          title: "現在地からの距離",
          icon: require("@/assets/images/歩くアイコン.png"),
          min: 100,
          max: 1500,
          interval: 100,
        },
        budget: {
          title: "予算",
          icon: require("@/assets/images/キュートながま口財布アイコン.png"),
          min: 100,
          max: 1000,
          interval: 100,
        },
      },
      tagsInput: {
        obsession: {
          title: "こだわり",
          icon: require("@/assets/images/タグアイコン2.png"),
          name: ["駅から近い", "大盛無料", "おかわり無料", "提供時間が短い"],
        },
      },
    };
  },
  methods: {
    // ストアのアクション呼び出し
    setKeyword(type, keyword) {
      this.$store.dispatch("Filtering/setKeyword", {
        type: type,
        keyword: keyword,
      });
    },
    setRange(type, value) {
      this.$store.dispatch("Filtering/setRange", {
        type: type,
        value: value,
      });
    },
    tagToggle(index) {
      this.$store.dispatch("Filtering/tagToggle", index);
    },
    filtered() {
      // this.$store.dispatch("Filtering/filtered");
    },
  },
  computed: {
    // ストアの読み込み
    states() {
      return this.$store.getters["Filtering/states"];
    },
  },
};
</script>

<style scoped>
.main {
  margin: 20px auto;
  font-size: 0.9em;
}

.mark {
  color: #2e603b;
  background-color: white;
}

.content div {
  margin: 30px 0;
}
</style>