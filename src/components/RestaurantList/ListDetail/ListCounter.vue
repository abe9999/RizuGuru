<template>
  <b-row>
    <p class="list-counter">検索結果：{{countValue}}件</p>
    {{countValue.default}}
  </b-row>
</template>

<script>
export default {
  props: {
    countValue: {
      value: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
.list-counter {
  margin-left: 20%;
  margin-bottom: 15px;
}

@media (max-width: 560px) {
  .list-counter {
    margin-left: 10%;
    margin-bottom: 15px;
  }
}
</style>