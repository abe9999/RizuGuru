<template>
  <div class="image">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      fade
      indicators
      background="#ababab"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        v-for="(imgPath, index) in imgPaths"
        :key="index"
        v-bind:img-src="`https://strizuguru.blob.core.windows.net/image/RestaurantDetail/${routeId}-${imgPath}.jpg`"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgPaths: [1, 2, 3, 4, 5],
      routeId: this.$route.params.id,
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script>

<style scoped>
#carousel-1 {
  width: 70%;
  max-width: 500px;
  margin: 0 auto 30px auto;
}
</style>