<template>
  <div class="tag">
    <Category category="サービス・特徴" />
    <hr />
    <p v-for="(data, index) in detail.restaurantToTag" :key="index" class="tags">{{ data.tag.tagContent }}</p>
    <hr />
  </div>
</template>

<script>
import Category from "@/components/RestaurantDetail/CategoryName.vue";

export default {
  data() {
    return {
      tags: [],
    };
  },
  components: {
    Category,
  },
  props: {
    detail: Object,
  },
};
</script>

<style scoped>
.tag {
  margin-bottom: 30px;
}

.tags {
  display: inline-block;
  margin: 0 10px 10px 0;
  padding: 5px 10px;
  font-size: smaller;
  background-color: #689e39;
  border-radius: 5px;
  color: white;
  text-align: center;
}
</style>