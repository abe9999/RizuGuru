<template>
  <h3 class="name">{{ detail.name }}</h3>
</template>

<script>
export default {
  props: {
    detail: Object,
  },
};
</script>

<style scoped>
.name {
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>