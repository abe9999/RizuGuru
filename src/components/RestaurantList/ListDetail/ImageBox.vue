<template>
  <b-col class="image-box">
    <!-- <img :src="require(`@/assets/images/RestaurantList/${imageUrl}`)"> -->
    <img :src="require(`@/assets/images/RestaurantList/${imageUrl}-1.jpg`)">
  </b-col>
</template>

<script>
export default {
  props: {
    imageUrl: String,
  },
};
</script>

<style scoped>
.image-box {
  text-align: center;
}

.image-box img {
  width: 50%;
}

@media (max-width: 560px) {
  .image-box img {
    width: 100%;
  }
}
</style>