export async function getGeoDistance(lat1, lng1, lat2, lng2, precision) {
    return new Promise((resolve) => {
        // 引数precision は小数点以下の桁数（距離の精度）
        var distance = 0;
        if (Math.abs(lat1 - lat2) < 0.00001 && Math.abs(lng1 - lng2) < 0.00001) {
            distance = 0;
        } else {
            lat1 = (lat1 * Math.PI) / 180;
            lng1 = (lng1 * Math.PI) / 180;
            lat2 = (lat2 * Math.PI) / 180;
            lng2 = (lng2 * Math.PI) / 180;

            var A = 6378140;
            var B = 6356755;
            var F = (A - B) / A;

            var P1 = Math.atan((B / A) * Math.tan(lat1));
            var P2 = Math.atan((B / A) * Math.tan(lat2));

            var X = Math.acos(
                Math.sin(P1) * Math.sin(P2) +
                Math.cos(P1) * Math.cos(P2) * Math.cos(lng1 - lng2)
            );
            var L =
                (F / 8) *
                (((Math.sin(X) - X) * Math.pow(Math.sin(P1) + Math.sin(P2), 2)) /
                    Math.pow(Math.cos(X / 2), 2) -
                    ((Math.sin(X) - X) * Math.pow(Math.sin(P1) - Math.sin(P2), 2)) /
                    Math.pow(Math.sin(X), 2));

            distance = A * (X + L);
            var decimal_no = Math.pow(10, precision);
            distance = Math.round((decimal_no * distance) / 1) / decimal_no; // kmに変換するときは(1000で割る)
        }
        resolve(distance);
    })
}