<template>
  <Loading v-if="loading" />
  <div id="detail" v-else-if="!loading">
    <Carousel />
    <RestaurantName :detail="detail" />
    <b-tabs
      active-nav-item-class="font-weight-bold"
      content-class="mt-3"
      justified
    >
      <b-tab title="店舗情報">
        <Infomation :detail="detail" :infoList="infoList" />
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
import { getDetail } from "@/plugins/getDetail.js";

export default {
  data() {
    return {
      loading: true,
      detail: {},
      infoList: [],
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
  mounted() {
    getDetail(this.$route.params.id)
      .then((res) => {
        this.detail = res;
        this.infoList = [
          { title: "住所", value: this.detail.address },
          { title: "営業時間", value: this.detail.openingHours },
          { title: "定休日", value: this.detail.regularHoliday },
          { title: "電話番号", value: this.detail.phoneNumber },
        ];
        this.loading = false;
      })
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