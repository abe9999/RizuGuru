import axios from "axios";

export async function getStation(word) {
  return new Promise((resolve) => {
    axios
      .get(
        `https://func-rizuguru.azurewebsites.net/api/GetStation?word=${word}`
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
