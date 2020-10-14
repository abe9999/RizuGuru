import axios from "axios"
export async function fetchTown(cityName) {
    return new Promise((resolve, reject) => {
        axios
            .get(
                `https://func-rizugurugeoapi.azurewebsites.net/api/getTownList?cityName=${cityName}`
            )
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    })
}