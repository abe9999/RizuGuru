<template>
  <span class="caution">{{ caution }}</span>
</template>

<script>
export default {
  props: {
    caution: String,
  },
};
</script>

<style scoped>
.caution {
  margin-left: 10px;
  color: gray;
}
</style>