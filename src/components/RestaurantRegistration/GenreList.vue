<template>
  <div>
    <b-form-select v-model="selected" :options="options" size="sm"></b-form-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      options: [
        { value: null, text: "選択してください" },
        { value: "和食", text: "和食" },
        { value: "洋食", text: "洋食" },
        { value: "中華料理", text: "中華料理" },
        { value: "そば", text: "そば" },
        { value: "うどん", text: "うどん" },
        { value: "ラーメン", text: "ラーメン" },
        { value: "カレー", text: "カレー" },
        { value: "エスニック料理", text: "エスニック料理" },
        { value: "とんかつ", text: "とんかつ" },
        { value: "その他", text: "その他" },
      ],
    };
  },
};
</script>

<style scoped>
select {
  width: 90%;
  height: 30px;
  margin-bottom: 15px;
  border: 1.5px solid gray;
  border-radius: 3px;
}
</style>

