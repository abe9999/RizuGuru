<template>
  <div class="info">
    <Category category="店舗情報" />
    <hr />
    <table class="info-tbl">
      <tr>
        <th>住所</th>
        <td>{{ detail.address }}</td>
      </tr>
      <tr>
        <th>営業時間</th>
        <td>{{ detail.openingHours }}</td>
      </tr>
      <tr>
        <th>定休日</th>
        <td>{{ detail.regularHoliday }}</td>
      </tr>
      <tr>
        <th>電話番号</th>
        <td>{{ detail.phoneNumber }}</td>
      </tr>
    </table>
    <hr />
  </div>
</template>

<script>
import Category from "@/components/Molecules/RestaurantDetail/CategoryName.vue";

export default {
  props: {
    detail: Object,
  },
  components: {
    Category,
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