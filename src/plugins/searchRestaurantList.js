import axios from "axios";

export async function searchRestaurantList({ searchQuery, offset = 0 }) {
    return new Promise((resolve) => {
        axios.get(`
        https://func-rizuguru.azurewebsites.net/api/SearchRestaurantList?offset=${offset}&keyword=${searchQuery.keyword}&lat=${searchQuery.lat}&lng=${searchQuery.lng}&station=${searchQuery.station}&genre=${searchQuery.genre}&distance=${searchQuery.distance}&minPrice=${searchQuery.minPrice}&maxPrice=${searchQuery.maxPrice}&tagId=${searchQuery.tagsId}`)
            .then((res) => {
                resolve(Promise.all(res.data));
            })
            .catch((err) => {
                console.log(err);
            });
    })
}