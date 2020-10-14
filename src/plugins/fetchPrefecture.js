import axios from "axios"
export async function fetchPrefecture() {
    return new Promise((resolve, reject) => {
        axios
            .get(
                "https://func-rizugurugeoapi.azurewebsites.net/api/getPrefectureList?"
            )
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    })
}