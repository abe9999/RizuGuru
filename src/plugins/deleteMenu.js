import axios from "axios";

export async function deleteMenu(postData) {
  return new Promise((resolve) => {
    axios
      .post(
        "https://func-rizuguru.azurewebsites.net/api/DeleteMenu?",
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