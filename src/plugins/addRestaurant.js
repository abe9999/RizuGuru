import axios from "axios";

export async function addRestaurant(postData) {
  return new Promise((resolve) => {
    axios
      .post(
        "https://func-rizuguru.azurewebsites.net/api/AddRestaurant?",
        postData
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
