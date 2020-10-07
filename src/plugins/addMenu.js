import axios from "axios";

export async function addMenu(postData) {
  return new Promise((resolve) => {
    axios
      .post(
        "https://func-rizuguru.azurewebsites.net/api/AddMenu?",
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