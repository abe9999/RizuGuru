<template>
  <div class="link" v-if="detail.links">
    <Category category="ホームページ・SNS" />
    <hr />
    <a v-for="(link, index) in detail.links" :href="link.url" :key="index" target="_blank">
      <img :src="require(`@/assets/images/RestaurantDetail/${link.icon}`)" class="icon" />
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
  data() {
    return {
      // links: [],
    };
  },
  components: {
    Category,
  },
  // mounted: function () {
  //   this.$axios
  //     .get(`http://localhost:8080/api/RestaurantLink/${this.$route.params.id}`)
  //     .then((res) => (this.links = res.data))
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // },
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