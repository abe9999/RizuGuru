import axios from "axios"
export async function fetchCity(prefId) {
    return new Promise((resolve, reject) => {
        axios
            .get(
                `https://func-rizugurugeoapi.azurewebsites.net/api/getCityList?prefId=${prefId}`
            )
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    })
}