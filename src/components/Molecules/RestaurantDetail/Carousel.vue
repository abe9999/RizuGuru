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
      <b-carousel-slide v-for="(imgPath, index) in imgPaths" :key="index">
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            :src="`https://strizuguru.blob.core.windows.net/images/RestaurantDetail/${routeId}/${routeId}-${imgPath}.jpg`"
            alt="image slot"
            @error="notFoundImage"
          /> </template
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
    notFoundImage(element) {
      element.target.src = require("@/assets/images/no-results2.png");
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

@media (max-width: 767px) {
  #carousel-1 {
    width: 100%;
  }
}
</style>