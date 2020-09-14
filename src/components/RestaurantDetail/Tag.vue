<template>
  <div class="tag">
    <Category category="サービス・特徴" />
    <hr />
    <p v-for="(tag, index) in tags" :key="index" class="tags">{{ tag }}</p>
    <hr />
  </div>
</template>

<script>
import Category from "@/components/RestaurantDetail/CategoryName.vue";

export default {
  data() {
    return {
      tagIds: [],
      tags: [],
    };
  },
  components: {
    Category,
  },
  mounted: function () {
    this.$axios
      .get(`https://rizugurufunctions.azurewebsites.net/api/GetTag/${this.$route.params.id}`)
      .then((res) => {
        this.tags = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
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