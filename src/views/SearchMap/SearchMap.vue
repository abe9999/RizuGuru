<template>
  <div id="map"></div>
</template>

<script>
import axios from "axios";

export default {
  /* eslint-disable */
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
      var latLng;
      var map;
      var marker;
      var markers = [];
      var infowindow;

      if (navigator.geolocation) {
        // 現在地の取得
        navigator.geolocation.getCurrentPosition(
          function (position) {
            // 緯度経度の取得
            latLng = new google.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            );

            // 地図の作成
            map = new google.maps.Map(document.getElementById("map"), {
              gestureHandling: "greedy",
              center: latLng,
              zoom: 14,
            });

            // マーカーの追加
            marker = new google.maps.Marker({
              position: latLng,
              map: map,
            });

            axios
              .get("https://func-rizuguru.azurewebsites.net/api/GetAllDetail")
              .then((res) => {
                for (var i = 0; i < res.data.length; i++) {
                  markers[i] = new google.maps.Marker({
                    map: map,
                    id: res.data[i].id,
                    position: new google.maps.LatLng(
                      res.data[i].latitude,
                      res.data[i].longitude
                    ),
                    icon: {
                      url: require("@/assets/images/ロゴ2.png"),
                      scaledSize: new google.maps.Size(35, 35),
                    },
                    title: res.data[i].name,
                    animation: google.maps.Animation.DROP,
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });

            google.maps.event.addListener(map, "idle", function () {
              for (var i = 0; i < markers.length; i++) {
                markerInfo(markers[i], markers[i].title);
              }
            });

            function markerInfo(marker, name) {
              google.maps.event.addListener(marker, "click", function (event) {
                if (infowindow) {
                  infowindow.close();
                }
                infowindow = new google.maps.InfoWindow({
                  content: `<a href="#/Restaurant/Detail/${marker.id}">${marker.title}</a>`,
                });
                infowindow.open(marker.getMap(), marker);
              });
            }
          },
          function () {
            alert("位置情報取得に失敗しました");
          }
        );
      } else {
        alert("この端末では位置情報が取得できません");
      }
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
#map {
  min-height: 500px;
}
</style>