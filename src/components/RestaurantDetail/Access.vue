<template>
  <div class="access">
    <Category category="交通手段" />
    <hr />
    <p>{{ detail.access }}</p>
    <hr />
  </div>
</template>

<script>
import Category from "@/components/RestaurantDetail/Molecules/CategoryName.vue";

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
.access {
  margin-bottom: 30px;
}
</style>