<template>
  <div class="payment">
    <Category category="支払方法" />
    <hr />
    <p>{{ detail.paymentMethod }}</p>
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
.payment {
  margin-bottom: 30px;
}
</style>