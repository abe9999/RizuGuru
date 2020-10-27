export default class restaurantRegistrationPostDataClass {
    constructor({ name = "", nameKana = "", address = "", lat = null, lng = null, access = "", stationId = null, phoneNumber = "", openingHours = "", regularHoliday = "", paymentMethod = "", genreId = [], url = [], linkGenreId = [], tagId = [] }) {
        this.Name = name
        this.NameKana = nameKana
        this.Address = address
        this.Latitude = lat
        this.Longitude = lng
        this.Access = access
        this.StationId = stationId
        this.PhoneNumber = phoneNumber
        this.OpeningHours = openingHours
        this.RegularHoliday = regularHoliday
        this.PaymentMethod = paymentMethod
        this.GenreId = genreId
        this.Url = url
        this.LinkGenreId = linkGenreId
        this.TagId = tagId
    }
}