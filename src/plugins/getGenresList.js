import axios from "axios";

export async function getGenresList() {
  return new Promise((resolve) => {
    axios
      .get(`https://func-rizuguru.azurewebsites.net/api/GetGenre?`)
      .then((res) => {
        var genresList = res.data;
        resolve(Promise.all(genresList));
      });
  });
}
