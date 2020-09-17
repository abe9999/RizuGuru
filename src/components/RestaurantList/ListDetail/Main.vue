<template>
  <router-link :to="`/Restaurant/Detail/${restaurantData.id}`" tag="div" class="item">
    <b-row>
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
    this.restaurantData.restaurantToTag.forEach((data) => {
      this.tags.push(data.tag.tagContent);
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
  }
}
</style>