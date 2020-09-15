<template>
  <div id="detail">
    <Carousel />
    <RestaurantName :detail="detail" />
    <b-tabs active-nav-item-class="font-weight-bold" content-class="mt-3" justified>
      <b-tab title="店舗情報">
        <Infomation :detail="detail" />
        <Link :detail="detail" />
        <Access :detail="detail" />
        <Payment :detail="detail" />
        <Tag :detail="detail" />
      </b-tab>
      <b-tab title="メニュー">
        <MenuList :detail="detail" />
      </b-tab>
      <b-tab title="地図">
        <Map :detail="detail" />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import Carousel from "@/components/RestaurantDetail/Carousel.vue";
import RestaurantName from "@/components/RestaurantDetail/RestaurantName.vue";
import MenuList from "@/components/RestaurantDetail/MenuList.vue";
import Infomation from "@/components/RestaurantDetail/Infomation.vue";
import Link from "@/components/RestaurantDetail/Link.vue";
import Access from "@/components/RestaurantDetail/Access.vue";
import Payment from "@/components/RestaurantDetail/Payment.vue";
import Tag from "@/components/RestaurantDetail/Tag.vue";
import Map from "@/components/RestaurantDetail/Map.vue";

export default {
  data() {
    return {
      detail: {},
    };
  },
  components: {
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
  mounted() {
    this.$axios
      .get(
        `https://func-rizuguru.azurewebsites.net/api/GetDetail?id=${this.$route.params.id}`
      )
      .then((res) => (this.detail = res.data))
      .catch((err) => {
        console.log(err);
      });
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