<template>
  <div class="menu">
    <Category category="メニュー" />
    <hr />
    <div class="menu-list">
      <table class="menu-list-tbl">
        <tr v-for="(menu, index) in menus" :key="index">
          <td>{{ menu.name }}</td>
          <td>{{ menu.price }}円</td>
        </tr>
      </table>
      <hr />
    </div>
  </div>
</template>

<script>
import Category from "@/components/RestaurantDetail/Molecules/CategoryName.vue";
import { getMenu } from "@/plugins/getMenu.js";

export default {
  data() {
    return {
      menus: [],
      count: 5,
    };
  },
  props: {
    detail: Object,
  },
  components: {
    Category,
  },
  mounted() {
    getMenu(this.$route.params.id).then((res) => (this.menus = res));
  },
  computed: {
    MenuItems() {
      const list = this.menus;
      return list.slice(0, this.count);
    },
  },
  methods: {
    isMore() {
      this.count = this.menus.length;
    },
    isClose() {
      this.count = 5;
    },
  },
};
</script>

<style scoped>
.menu {
  margin-bottom: 30px;
}

.menu-list-tbl {
  width: 100%;
}

.btn {
  margin-top: 10px;
}

.menu-list-tbl td:nth-of-type(odd) {
  float: left;
  width: 80%;
}

.menu-list-tbl td:nth-of-type(even) {
  float: right;
  text-align: right;
  width: 20%;
}
</style>