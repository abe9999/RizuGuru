import { getGeoDistance } from "@/plugins/getGeoDistance.js";
import { getCurrentLocation } from "@/plugins/getCurrentLocation.js";
import axios from "axios";

export function searchRestaurantList(...args) {
    switch (args.length) {
        case 3:
            // ホーム画面から検索を行った場合
            return getRestaurantListFromHome(args);
        case 9:
            // 店舗一覧画面で絞り込み検索を行った場合
            return getRestaurantListFromFiltering(args);
        default:
            return null;
    }
}

// ホーム画面から検索
async function getRestaurantListFromHome(args) {
    return new Promise((resolve) => {
        var currentLocation = {}
        getCurrentLocation().then(res => {
            currentLocation = res
            axios.get(`https://func-rizuguru.azurewebsites.net/api/GetAllDetail?keyword=${args[0]}&lat=${currentLocation.lat}&lng=${currentLocation.lng}`)
                .then((res) => {
                    var result = res.data
                    resolve(Promise.all(result))
                })
                .catch((err) => {
                    console.log(err);
                });
        })
    })
}

// 絞り込み画面から検索
async function getRestaurantListFromFiltering(args) {
    return new Promise((resolve) => {
        axios.get(`https://func-rizuguru.azurewebsites.net/api/Filtering?keyword=${args[0]}&lat=${args[1]}&lng=${args[2]}&station=${args[3]}&genre=${args[4]}&distance=${args[5]}&minPrice=${args[6]}&maxPrice=${args[7]}&tagId=${args[8]}`)
            .then((res) => {
                var result = res.data
                getCurrentLocation().then(res => {
                    result.forEach(element => {
                        getGeoDistance(
                            res.lat,
                            res.lng,
                            element.latitude,
                            element.longitude,
                            0
                        ).then(res => { element.distance = res });
                    });
                    resolve(Promise.all(result))
                })
            })
            .catch((err) => {
                console.log(err);
            });
    })
}