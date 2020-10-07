<template>
  <div class="info">
    <Category category="店舗情報" />
    <hr />
    <table class="info-tbl" v-if="detail">
      <tr v-for="(info, index) in infoList" :key="index">
        <th>{{ info.title }}</th>
        <td>{{ info.value }}</td>
      </tr>
    </table>
    <hr />
  </div>
</template>

<script>
import Category from "@/components/RestaurantDetail/Molecules/CategoryName.vue";

export default {
  props: {
    detail: Object,
  },
  data() {
    return {
      infoList: [],
    };
  },
  components: {
    Category,
  },
  watch: {
    detail(newDetail) {
      this.infoList = [
        { title: "住所", value: newDetail.address },
        { title: "営業時間", value: newDetail.openingHours },
        { title: "定休日", value: newDetail.regularHoliday },
        { title: "電話番号", value: newDetail.phoneNumber },
      ];
    },
  },
};
</script>

<style scoped>
.info {
  margin-bottom: 30px;
}

.info-tbl tr {
  vertical-align: baseline;
}

.info-tbl th {
  width: 100px;
  padding: 5px 0;
  text-align: left;
}

.info-tbl td {
  padding: 5px 0;
}
</style>