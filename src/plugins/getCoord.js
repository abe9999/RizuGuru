import axios from "axios";

export async function getCoord(address) {
  return new Promise((resolve) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&components=country:JP&key=AIzaSyBoh8D4HaNFoW-IzGEm-Lsx5zqPEhdJ398`
      )
      .then((res) => {
        var result = res.data;
        resolve(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
