import { getGeoDistance } from "@/plugins/getGeoDistance.js";
import { getCurrentLocation } from "@/plugins/getCurrentLocation.js";
import axios from "axios";

export function searchRestaurantList(...args) {
    switch (args.length) {
        case 3:
            // ホーム画面から検索を行った場合
            return getRestaurantListFromHome(args);
        case 6:
            // 店舗一覧画面で絞り込み検索を行った場合
            return getRestaurantListFromFiltering(args);
        default:
            return null;
    }
}

async function getRestaurantListFromHome(args) {
    return new Promise((resolve) => {
        var currentLocation = {}
        getCurrentLocation().then(res => {
            currentLocation = res
            axios.get(`https://func-rizuguru.azurewebsites.net/api/GetAllDetail?word=${args[0]}&lat=${currentLocation.lat}&lng=${currentLocation.lng}`)
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

async function getRestaurantListFromFiltering(args) {
    return new Promise((resolve) => {
        axios.get(`https://func-rizuguru.azurewebsites.net/api/Filtering?word=${args[0]}&station=${args[1]}&genre=${args[2]}&minPrice=${args[3]}&maxPrice=${args[4]}&tagId=${args[5]}`)
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