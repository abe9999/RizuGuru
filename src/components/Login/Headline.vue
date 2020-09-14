<template>
  <h2>
    <img src="@/assets/images/triangle.png" />
    {{ headline }}
  </h2>
</template>

<script>
export default {
  props: ["headline"],
};
</script>

<style scoped>
h2 {
  padding-bottom: 20px;
  margin-left: -10px;
}

img {
  width: 15px;
  height: 15px;
  margin-bottom: 6px;
}
</style>