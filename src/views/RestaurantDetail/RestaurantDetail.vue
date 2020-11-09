<template>
  <Loading v-if="$apollo.loading" />
  <div id="detail" v-else-if="!$apollo.loading">
    <Carousel />
    <RestaurantName :detail="restaurantDetail" />
    <b-tabs
      active-nav-item-class="font-weight-bold"
      content-class="mt-3"
      justified
    >
      <b-tab title="店舗情報">
        <Infomation :detail="restaurantDetail" />
        <Link :detail="restaurantDetail" />
        <Access :detail="restaurantDetail" />
        <Payment :detail="restaurantDetail" />
        <Tag :detail="restaurantDetail" />
      </b-tab>
      <b-tab title="メニュー">
        <MenuList :menuList="menuList" />
      </b-tab>
      <b-tab title="地図">
        <Map :detail="restaurantDetail" />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import gql from "graphql-tag";
import Loading from "@/components/Atoms/Loading.vue";
import Carousel from "@/components/Molecules/RestaurantDetail/Carousel.vue";
import RestaurantName from "@/components/Molecules/RestaurantDetail/RestaurantName.vue";
import MenuList from "@/components/Molecules/RestaurantDetail/MenuList.vue";
import Infomation from "@/components/Molecules/RestaurantDetail/Infomation.vue";
import Link from "@/components/Molecules/RestaurantDetail/Link.vue";
import Access from "@/components/Molecules/RestaurantDetail/Access.vue";
import Payment from "@/components/Molecules/RestaurantDetail/Payment.vue";
import Tag from "@/components/Molecules/RestaurantDetail/Tag.vue";
import Map from "@/components/Molecules/RestaurantDetail/Map.vue";

export default {
  apollo: {
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
    menuList: {
      query: gql`
        query($id: ID!) {
          menuList(id: $id) {
            name
            price
          }
        }
      `,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
    },
  },
  data() {
    return {
      loading: true,
      detail: {},
      infoList: [],
      restaurantDetail: {},
      menuList: {},
    };
  },
  components: {
    Loading,
    Carousel,
    RestaurantName,
    MenuList,
    Infomation,
    Link,
    Access,
    Payment,
    Tag,
    Map,
  },
};
</script>

<style scoped>
#detail {
  width: 90%;
  max-width: 800px;
  margin: 20px auto 0px auto;
}
</style>