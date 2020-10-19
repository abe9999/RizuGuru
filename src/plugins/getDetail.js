import axios from "axios";

export async function getDetail(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://func-rizuguru.azurewebsites.net/api/GetDetail?id=${id}`)
      .then((res) => {
        var result = res.data;
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
