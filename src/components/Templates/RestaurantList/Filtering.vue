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
        <b-row>
          <p>現在の検索キーワード：{{ filteringItemData.keyword.value }}</p>
        </b-row>
        <!-- 駅キーワード入力欄 -->
        <InputFormUnitWithIcon
          :itemData="filteringItemData.station"
          :getter="getter"
          :setter="setter"
        />
        <!-- カテゴリーキーワード入力欄 -->
        <InputFormUnitWithIcon
          :itemData="filteringItemData.genre"
          :getter="getter"
          :setter="setter"
        />
        <!-- 現在地からの距離選択欄 -->
        <SliderFormUnit
          :itemData="filteringItemData.distance"
          :getter="getter"
          :setter="setter"
        />
        <!-- 予算選択欄 -->
        <SliderFormUnit
          :itemData="filteringItemData.budget"
          :getter="getter"
          :setter="setter"
        />
        <!-- こだわりタグ選択欄 -->
        <TagFormUnit
          :title="filteringItemData.tags.displayName"
          :required="filteringItemData.tags.required"
          :tagFormList="filteringItemData.tags.value"
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
import TagFormUnit from "@/components/Molecules/TagFormUnit.vue";
import Button from "@/components/Atoms/Button.vue";

export default {
  components: {
    Headline,
    InputFormUnitWithIcon,
    SliderFormUnit,
    TagFormUnit,
    Button,
  },
  props: {
    searchButtonAction: Function,
    filteringItemData: Object,
    getter: Function,
    setter: Function,
    tagSwitcher: Function,
  },
};
</script>

<style scoped>
.main {
  width: 100%;
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