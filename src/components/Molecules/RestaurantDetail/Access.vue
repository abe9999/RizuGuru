<template>
  <div class="access">
    <Category category="交通手段" />
    <hr />
    <ul>
      <li v-for="(a, index) in accessArr" :key="index">{{ a }}</li>
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
  data() {
    return {
      detailArr: [],
    };
  },
  created() {
    this.accessArr = this.detail.access.split(" ");
  },
};
</script>

<style scoped>
li {
  margin-bottom: 4px;
}

.access {
  margin-bottom: 30px;
}
</style>