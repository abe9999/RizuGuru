<template>
  <router-link :to="`/Restaurant/Detail/${restaurantData.id}`" tag="div" class="item">
    <b-row>
      <!-- <ImageBox :imageUrl="restaurantData.image" /> -->
      <ImageBox :imageUrl="restaurantData.id" />
      <Description :restaurantData="restaurantData" :tags="tags" />
    </b-row>
  </router-link>
</template>

<script>
import ImageBox from "@/components/RestaurantList/ListDetail/ImageBox.vue";
import Description from "@/components/RestaurantList/ListDetail/Description.vue";
export default {
  components: {
    Description,
    ImageBox,
  },
  data() {
    return {
      tags: [],
    };
  },
  props: {
    restaurantData: Object,
  },
  mounted() {
    this.$axios
      .get(`https://rizugurufunctions.azurewebsites.net/api/GetTag/${this.restaurantData.id}`)
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
a {
  text-decoration: none;
  color: black;
}

.item {
  width: 80%;
  cursor: pointer;
  padding: 15px;
  background-color: #f6f6f6;
  border-radius: 15px;
}

@media (max-width: 560px) {
  p {
    margin: 0;
  }

  .item {
    width: 100%;
    margin: 0 auto;
    margin-right: -10px;
  }
}
</style>