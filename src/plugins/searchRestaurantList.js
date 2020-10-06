import axios from "axios";

export function searchRestaurantList(args) {
    switch (Object.keys(args).length) {
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
        axios.get(`https://func-rizuguru.azurewebsites.net/api/GetRestaurantList?keyword=${args.keyword}&lat=${args.lat}&lng=${args.lng}`)
            .then((res) => {
                var result = res.data
                resolve(Promise.all(result))
            })
            .catch((err) => {
                console.log(err);
            });
    })
}

// 絞り込み画面から検索
async function getRestaurantListFromFiltering(args) {
    args.distance == 2500 ? args.distance = "" : args.distance
    return new Promise((resolve) => {
        axios.get(`https://func-rizuguru.azurewebsites.net/api/Filtering?keyword=${args.keyword}&lat=${args.lat}&lng=${args.lng}&station=${args.station}&genre=${args.genre}&distance=${args.distance}&minPrice=${args.minPrice}&maxPrice=${args.maxPrice}&tagId=${args.tagsId}`)
            .then((res) => {
                resolve(Promise.all(res.data))
            })
            .catch((err) => {
                console.log(err);
            });
    })
}