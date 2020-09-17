<template>
    <b-col cols="12" md="4" class="image-box">
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
  width: 100%;
  margin: auto 0;
}

.image-box img {
  width: 80%;
}

@media (max-width: 560px) {
  .image-box {
    margin: 0 auto;
  }

  .image-box img {
    width: 50%;
  }
}
</style>