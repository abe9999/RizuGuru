<template>
  <div>
    <Category category="地図" />
    <hr />
    <div id="map"></div>
    <hr />
  </div>
</template>

<script>
import Category from "@/components/RestaurantDetail/CategoryName.vue";
// import axios from "axios";

export default {
  /* eslint-disable */
  props: {
    detail: Object,
  },
  components: {
    Category,
  },
  methods: {
    loadJS(src) {
      const ref = window.document.getElementsByTagName("script")[0];
      const script = window.document.createElement("script");
      script.src = src;
      script.async = true;
      script.setAttribute("id", "google-map");
      ref.parentNode.insertBefore(script, ref);
    },
    initMap() {
      var map;
      var marker;

      // axios
      //   .get(`https://func-rizuguru.azurewebsites.net/api/GetDetail?id=${this.$route.params.id}`)
      //   .then((res) => {
      //     map = new google.maps.Map(document.getElementById("map"), {
      //       gestureHandling: "greedy",
      //       center: new google.maps.LatLng(
      //         res.data.latitude,
      //         res.data.longitude
      //       ),
      //       zoom: 16,
      //     });

      //     marker = new google.maps.Marker({
      //       position: new google.maps.LatLng(
      //         res.data.latitude,
      //         res.data.longitude
      //       ),
      //       map: map,
      //     });
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

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
      }, 500);
    },
  },
  created() {
    this.loadJS(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyBoh8D4HaNFoW-IzGEm-Lsx5zqPEhdJ398&callback=initMap`
    );
    window.initMap = this.initMap;
  },
  destroyed() {
    const oldTag = document.getElementById("google-map");
    oldTag.parentNode.removeChild(oldTag);
    window.google = {};
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