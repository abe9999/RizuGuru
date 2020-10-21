<template>
  <div class="access">
    <Category category="交通手段" />
    <hr />
    <ul>
      <li v-for="(access, index) in accessArr" :key="index">{{ access }}</li>
    </ul>
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
  created() {
    this.accessArr = this.detail.access.split(" ");
  },
};
</script>

<style scoped>
ul {
  padding-left: 0;
}

li {
  margin-bottom: 4px;
  list-style: none;
}

.access {
  margin-bottom: 30px;
}
</style>