<template>
  <div>
    <label>サービス・特徴</label>
    <label v-for="(tag, key) in tags" :key="key" class="tag">
      <input type="checkbox" />
      {{ tag }}
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: ["大盛無料", "おかわり無料", "テイクアウト可"],
    };
  },
};
</script>

<style scoped>
label {
  display: flex;
  padding-bottom: 5px;
}

.tag {
  display: inline;
  margin-right: 10px;
}
</style>
