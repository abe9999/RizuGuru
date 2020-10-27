export function getCurrentLocation() {
    return getCurrentLocationAsync();
}

async function getCurrentLocationAsync() {
    return new Promise((resolve) => {
        var currentLocation = {}
        navigator.geolocation.getCurrentPosition((position) => {
            // 緯度経度の取得
            currentLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
            resolve(currentLocation)
        });
    })
}