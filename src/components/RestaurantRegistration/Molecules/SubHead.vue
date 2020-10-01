<template>
  <h5>
    <img src="@/assets/images/triangle.png" />
    {{ subHead }}
  </h5>
</template>

<script>
export default {
  props: {
    subHead: String,
  },
};
</script>

<style scoped>
h5 {
  padding-bottom: 20px;
  margin-left: 1%;
}

img {
  width: 12px;
  height: 12px;
  margin-bottom: 5px;
}
</style>