<template>
  <p class="category">{{ category }}</p>
</template>

<script>
export default {
  props: {
    category: String
  },
};
</script>

<style scoped>
.category {
  font-size: 1.1em;
  font-weight: bold;
}
</style>