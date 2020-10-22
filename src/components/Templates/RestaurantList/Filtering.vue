<template>
  <b-container class="wrapper">
    <b-row>
      <b-col>
        <!-- ページタイトル -->
        <Headline headline="絞り込む" />
      </b-col>
    </b-row>
    <b-row>
      <b-col class="container">
        <b-row class="keyword-item" v-if="filteringItemData.keyword.value">
          <p>現在の検索キーワード：</p>
          <ul class="keyword-list">
            <li v-for="(keyword, index) in keywordArr" :key="index">
              {{ keyword }}
            </li>
          </ul>
        </b-row>
        <!-- 駅キーワード入力欄 -->
        <InputFormUnitWithIcon
          class="form"
          :itemData="filteringItemData.station"
          :getter="getter"
          :setter="setter"
        />
        <!-- カテゴリーキーワード入力欄 -->
        <InputFormUnitWithIcon
          class="form"
          :itemData="filteringItemData.genre"
          :getter="getter"
          :setter="setter"
        />
        <!-- 現在地からの距離選択欄 -->
        <SliderFormUnit
          class="form"
          v-if="
            this.$store.getters['CurrentLocation/getCurrentLocation'].lat ||
            this.$store.getters['CurrentLocation/getCurrentLocation'].lng
          "
          :itemData="filteringItemData.distance"
          :getter="getter"
          :setter="setter"
        />
        <!-- 予算選択欄 -->
        <SliderFormUnit
          class="form"
          :itemData="filteringItemData.budget"
          :getter="getter"
          :setter="setter"
        />
        <!-- こだわりタグ選択欄 -->
        <TagFormUnitWithIcon
          class="form"
          :itemData="filteringItemData.tagsId"
          :tagFormList="filteringItemData.tagsId.value"
          :action="tagSwitcher"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <!-- 検索ボタン -->
        <Button message="検索" :action="searchButtonAction" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Headline from "@/components/Molecules/Headline.vue";
import InputFormUnitWithIcon from "@/components/Molecules/InputFormUnitWithIcon.vue";
import SliderFormUnit from "@/components/Molecules/SliderFormUnit.vue";
import TagFormUnitWithIcon from "@/components/Molecules/TagFormUnitWithIcon.vue";
import Button from "@/components/Atoms/Button.vue";

export default {
  components: {
    Headline,
    InputFormUnitWithIcon,
    SliderFormUnit,
    TagFormUnitWithIcon,
    Button,
  },
  props: {
    searchButtonAction: Function,
    filteringItemData: Object,
    getter: Function,
    setter: Function,
    tagSwitcher: Function,
  },
  data() {
    return {
      keywordArr: [],
    };
  },
  created() {
    var keyword = this.filteringItemData.keyword.value;
    if (keyword) {
      // eslint-disable-next-line no-irregular-whitespace
      this.keywordArr = keyword.split(/[ 　]/);
    }
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  margin: 20px auto;
  font-size: 0.9em;
}

.keyword-item {
  margin-left: 5px;
}

.form {
  margin-bottom: 25px;
}

.keyword-list {
  list-style: none;
  display: flex;
  padding: 0;
}

.keyword-list li {
  margin-left: 15px;
  padding-left: 5px;
  padding-right: 5px;
  color: white;
  background-color: #689e39;
  border-radius: 5px;
}
</style>