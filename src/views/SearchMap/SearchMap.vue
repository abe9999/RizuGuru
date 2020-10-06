<template>
  <div id="map"></div>
</template>

<script>
import { getAllDetail } from "@/plugins/getAllDetail.js";

export default {
  /* eslint-disable */
  mounted() {
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

          getAllDetail().then((res) => {
            for (var i = 0; i < res.length; i++) {
              markers[i] = new google.maps.Marker({
                map: map,
                id: res[i].id,
                position: new google.maps.LatLng(
                  res[i].latitude,
                  res[i].longitude
                ),
                icon: {
                  url: require("@/assets/images/ロゴ2.png"),
                  scaledSize: new google.maps.Size(35, 35),
                },
                title: res[i].name,
                animation: google.maps.Animation.DROP,
              });
            }
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
};
</script>

<style scoped>
#map {
  min-height: 500px;
}
</style>