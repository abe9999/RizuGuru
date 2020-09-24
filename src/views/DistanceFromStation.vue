<template>
  <div>
    <input type="text" v-model="address" @keydown.enter="search()" />
    <ul>
      <li v-for="(station, index) in stations" :key="index">
        {{ station.name }}駅から{{ station.distance }}m(徒歩{{
          station.duration
        }})
      </li>
    </ul>
  </div>
</template>

<script>
import Enumerable from "linq";

export default {
  data() {
    return {
      stations: [],
      address: "",
      coord: {},
    };
  },
  methods: {
    geoDistance(lat1, lng1, lat2, lng2, precision) {
      // 引数precision は小数点以下の桁数（距離の精度）
      var distance = 0;
      if (Math.abs(lat1 - lat2) < 0.00001 && Math.abs(lng1 - lng2) < 0.00001) {
        distance = 0;
      } else {
        lat1 = (lat1 * Math.PI) / 180;
        lng1 = (lng1 * Math.PI) / 180;
        lat2 = (lat2 * Math.PI) / 180;
        lng2 = (lng2 * Math.PI) / 180;

        var A = 6378140;
        var B = 6356755;
        var F = (A - B) / A;

        var P1 = Math.atan((B / A) * Math.tan(lat1));
        var P2 = Math.atan((B / A) * Math.tan(lat2));

        var X = Math.acos(
          Math.sin(P1) * Math.sin(P2) +
            Math.cos(P1) * Math.cos(P2) * Math.cos(lng1 - lng2)
        );
        var L =
          (F / 8) *
          (((Math.sin(X) - X) * Math.pow(Math.sin(P1) + Math.sin(P2), 2)) /
            Math.pow(Math.cos(X / 2), 2) -
            ((Math.sin(X) - X) * Math.pow(Math.sin(P1) - Math.sin(P2), 2)) /
              Math.pow(Math.sin(X), 2));

        distance = A * (X + L);
        var decimal_no = Math.pow(10, precision);
        distance = Math.round((decimal_no * distance) / 1) / decimal_no; // kmに変換するときは(1000で割る)
      }
      return distance;
    },

    search() {
      this.$axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${this.address}&components=country:JP&key=AIzaSyBoh8D4HaNFoW-IzGEm-Lsx5zqPEhdJ398`
        )
        .then((res) => {
          this.coord = res.data.results[0].geometry.location;
        });

      this.$axios
        .get("https://func-rizuguru.azurewebsites.net/api/GetStation?word=")
        .then((res) => {
          this.stations = res.data;
          for (var i = 0; i < this.stations.length; i++) {
            var distance = this.geoDistance(
              this.coord.lat,
              this.coord.lng,
              this.stations[i].latitude,
              this.stations[i].longitude,
              0
            );
            this.stations[i].distance = distance;
          }

          this.stations = Enumerable.from(this.stations)
            .select((x) => x)
            .orderBy((x) => x.distance)
            .toArray();

          if (this.stations[0].distance > 800) {
            this.stations = this.stations.slice(0, 1);
          } else {
            this.stations = Enumerable.from(this.stations)
              .where((x) => x.distance <= 800)
              .toArray();
          }
        });

      for (var i = 0; i < this.stations.length; i++) {
        this.$axios
          .get(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${this.stations[i].latitude},${this.stations[i].longitude}&destination=${this.coord.lat},${this.coord.lng}&mode=walking&key=AIzaSyBoh8D4HaNFoW-IzGEm-Lsx5zqPEhdJ398`
          )
          .then((res) => {
            this.stations[i].duration =
              res.data.routes[0].legs[0].duration.text;
            console.log(res.data.routes[0].legs[0].duration.text);
          });
      }
    },
  },
};
</script>