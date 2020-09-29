<template>
  <div>
    <table class="menu-list">
      <tr class="title">
        <th></th>
        <th>メニュー名</th>
        <th>メニュー名(カナ)</th>
        <th>値段</th>
      </tr>
      <draggable v-model="menuList" tag="tbody" @update="update">
        <tr v-for="(menu, index) in menuList" :key="index">
          <td @click="remove(index)">×</td>
          <td>{{ menu.name }}</td>
          <td>{{ menu.nameKana }}</td>
          <td>{{ menu.price }}</td>
        </tr>
      </draggable>
    </table>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  props: {
    menus: Array,
  },
  data() {
    return {
      menuList: this.menus,
    };
  },
  components: {
    draggable,
  },
  methods: {
    update() {
      this.$emit("update", this.menuList);
    },
    remove(index) {
      this.$emit("remove", index);
    },
  },
  watch: {
    menus(newMenus) {
      this.menuList = newMenus;
    },
  },
};
</script>

<style scoped>
.menu-list {
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;
  border-spacing: 0;
}

.menu-list th:nth-child(1),
.menu-list td:nth-child(1) {
  width: 10%;
  text-align: center;
  color: gray;
  font-size: 1.4em;
}

.menu-list th:nth-child(4),
.menu-list td:nth-child(4) {
  width: 10%;
  text-align: center;
}

.title,
.menu-list tr:nth-child(even) {
  background-color: #eee;
}
</style>