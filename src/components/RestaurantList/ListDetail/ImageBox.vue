<template>
  <b-col class="image-box">
    <!-- <img :src="require(`@/assets/images/RestaurantList/${imageUrl}`)"> -->
    <img :src="this.url" />
  </b-col>
</template>

<script>
export default {
  data() {
    return {
      url: `https://strizuguru.blob.core.windows.net/images/RestaurantList/${this.imageUrl}-1.jpg`,
    };
  },
  props: {
    imageUrl: Number,
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