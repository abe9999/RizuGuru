import gql from "graphql-tag";
export const RestaurantDetailGql = {
  restaurantDetail: {
    query: gql`
    query($id: ID!) {
      restaurantDetail(id: $id) {
        name
        address
        latitude
        longitude
        access
        phoneNumber
        openingHours
        regularHoliday
        paymentMethod
        link {
          url
          linkGenre {
            path
          }
        }
        restaurantToTag {
          tag {
            id
            tagContent
          }
        }
      }
    }
  `,
    variables() {
      return {
        id: this.$route.params.id,
      };
    },
  },
}