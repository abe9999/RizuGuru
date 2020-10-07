<template>
  <div>
    <Category category="地図" />
    <hr />
    <div id="map"></div>
    <hr />
  </div>
</template>

<script>
import Category from "@/components/RestaurantDetail/Molecules/CategoryName.vue";

export default {
  /* eslint-disable */
  props: {
    detail: Object,
  },
  components: {
    Category,
  },
  mounted() {
    var map;
    var marker;

    setTimeout(() => {
      map = new google.maps.Map(document.getElementById("map"), {
        gestureHandling: "greedy",
        center: new google.maps.LatLng(
          this.detail.latitude,
          this.detail.longitude
        ),
        zoom: 16,
      });

      marker = new google.maps.Marker({
        position: new google.maps.LatLng(
          this.detail.latitude,
          this.detail.longitude
        ),
        map: map,
      });
    }, 3000);
  },
};
</script>

<style scoped>
@media (max-width: 500px) {
  #map {
    height: 300px;
  }
}

@media (min-width: 501px) {
  #map {
    height: 500px;
  }
}
</style>