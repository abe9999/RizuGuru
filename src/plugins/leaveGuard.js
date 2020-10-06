const completeViewPathList = ["/RestaurantRegistration/Complete", "/MenuRegistration/Complete"]
export const leaveGuard = {
    beforeRouteLeave(to, from, next) {
        // completeViewPathListに含まれていないパスに遷移する場合、アラートを表示する。
        if (completeViewPathList.indexOf(to.path)) {
            const answer = window.confirm('入力した情報が消去されます。よろしいですか？');
            if (answer) {
                next();
            } else {
                next(false);
            }
        } else {
            next();
        }
    }
}