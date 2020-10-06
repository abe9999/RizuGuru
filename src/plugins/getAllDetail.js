import axios from "axios";

export async function getAllDetail() {
  return new Promise((resolve) => {
    axios
      .get(`https://func-rizuguru.azurewebsites.net/api/GetAllDetail?`)
      .then((res) => {
        var result = res.data;
        resolve(Promise.all(result));
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
