import axios from "axios";

export async function uploadImages(postData) {
  return new Promise((resolve) => {
    axios
      .post(
        "https://func-rizuguruimage.azurewebsites.net/api/UploadImages?",
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
