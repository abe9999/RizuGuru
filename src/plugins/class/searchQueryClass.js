export default class searchQuery {
    constructor({ keyword = "", lat = null, lng = null, station = "", genre = "", distance = "", minPrice = 0, maxPrice = 1000, tagsId = [""] }) {
        this.keyword = keyword
        this.lat = lat
        this.lng = lng
        this.station = station
        this.genre = genre
        this.distance = distance
        this.minPrice = minPrice
        this.maxPrice = maxPrice
        this.tagsId = tagsId
    }
}