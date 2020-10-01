<template>
  <div class="wrppaer">
    <h2>
      <img src="@/assets/images/triangle.png" />
      {{ headline }}
    </h2>
  </div>
</template>

<script>
export default {
  props: {
    headline: {
      type: String,
      required: true,
      default: "HeadLine",
    },
  },
};
</script>

<style scoped>
h2 {
  margin-top: 2%;
  padding-bottom: 20px;
}

img {
  width: 15px;
  height: 15px;
  margin-bottom: 6px;
}
</style>