<template>
  <div class="link" v-if="detail.link && detail.link.length > 0">
    <Category category="ホームページ・SNS" />
    <hr />
    <a v-for="(link, index) in detail.link" :href="link.url" :key="index" target="_blank">
      <img :src="require(`@/assets/images/RestaurantDetail/${link.linkGenre.path}`)" class="icon" />
    </a>
    <hr />
  </div>
</template>

<script>
import Category from "@/components/RestaurantDetail/CategoryName.vue";

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
.link {
  margin-bottom: 30px;
}

.icon {
  margin-left: 5px;
  margin-right: 15px;
  width: 25px;
  height: 25px;
}
</style>