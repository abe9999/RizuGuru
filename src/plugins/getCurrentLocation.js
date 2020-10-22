export function getCurrentLocation() {
    if (navigator.geolocation) {
        return getCurrentLocationAsync();
    } else {
        alert("この端末では位置情報が取得できません");
    }
}

async function getCurrentLocationAsync() {
    return new Promise((resolve) => {
        var currentLocation = {}
        navigator.geolocation.getCurrentPosition(
            function (position) {
                // 緯度経度の取得
                currentLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
                resolve(currentLocation)
            }.bind(this),
            function () {
                // alert("位置情報取得に失敗しました");
            }
        );
    })
}