<template>
  <div class="wrapper">
    <p>検索結果：{{ value }} 件</p>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
@media (min-width: 560px) {
  .wrapper {
    margin-left: 20%;
  }
}
</style>