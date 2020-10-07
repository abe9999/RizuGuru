<template>
  <p class="category">
    <img src="@/assets/images/triangle.png" />
    {{ category }}
  </p>
</template>

<script>
export default {
  props: {
    category: String,
  },
};
</script>

<style scoped>
.category {
  font-size: 1.1em;
  font-weight: bold;
}

img {
  width: 15px;
  height: 15px;
  margin-bottom: 5px;
}
</style>