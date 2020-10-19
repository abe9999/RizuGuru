<template>
  <b-col cols="12" md="4">
    <div class="wrapper">
      <img class="image" :src="url" @error="notFoundImage" />
    </div>
  </b-col>
</template>

<script>
export default {
  props: {
    imageId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      url: `https://strizuguru.blob.core.windows.net/images/RestaurantList/${this.imageId}-1.jpg`,
    };
  },
  methods: {
    notFoundImage(element) {
      element.target.src = require("@/assets/images/no-results.png");
    },
  },
};
</script>

<style scoped>
.wrapper {
  text-align: center;
  width: 100%;
  margin: auto 0;
}

.image {
  width: 100%;
}

@media (max-width: 767px) {
  .wrapper {
    margin: 0 auto;
  }

  .image {
    width: 65%;
  }
}
</style>