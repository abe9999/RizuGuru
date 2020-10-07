<template>
  <div class="info">
    <Category category="店舗情報" />
    <hr />
    <table class="info-tbl">
      <tr v-for="(info, index) in infoList" :key="index">
        <th>{{ info.title }}</th>
        <td>{{ info.value }}</td>
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
    infoList: Array
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