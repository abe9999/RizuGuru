<template>
  <div class="menu">
    <div class="category-wrapper">
      <Category id="category" category="メニュー" />
      <b-dropdown id="sort-menu" right variant="success">
        <template #button-content>{{ selected }}</template>
        <b-dropdown-item
          v-for="(item, index) in selectItems"
          :key="index"
          @click="doSelect(index)"
          >{{ item }}</b-dropdown-item
        >
      </b-dropdown>
    </div>
    <hr />
    <div class="menu-list">
      <table class="menu-list-tbl">
        <tr v-for="(menu, index) in sortMenus" :key="index">
          <td>{{ menu.name }}</td>
          <td>{{ menu.price }}円</td>
        </tr>
      </table>
      <hr />
    </div>
  </div>
</template>

<script>
import Category from "@/components/Molecules/RestaurantDetail/CategoryName.vue";
import Enumerable from "linq";

export default {
  data() {
    return {
      selected: "おすすめ順",
      selectItems: ["おすすめ順", "安い順", "高い順"],
    };
  },
  props: {
    menuList: Array,
  },
  components: {
    Category,
  },
  methods: {
    doSelect(index) {
      this.selected = this.selectItems[index];
    },
  },
  computed: {
    sortMenus() {
      if (this.selected == "おすすめ順") {
        return Enumerable.from(this.menuList)
          .orderBy((x) => x.sortId)
          .toArray();
      } else if (this.selected == "安い順") {
        return Enumerable.from(this.menuList)
          .orderBy((x) => x.price)
          .toArray();
      } else if (this.selected == "高い順") {
        return Enumerable.from(this.menuList)
          .orderByDescending((x) => x.price)
          .toArray();
      }
      return null;
    },
  },
};
</script>

<style scoped>
.menu {
  margin-bottom: 30px;
}
#category {
  vertical-align: middle;
  margin-bottom: 0px;
}
.category-wrapper {
  display: flex;
  align-items: center;
}
#sort-menu {
  margin: 0 0 0 auto;
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