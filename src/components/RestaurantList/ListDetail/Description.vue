<template>
  <b-col>
    <div class="item-detail">
      <p class="restaurant-name">{{ restaurantData.name }}</p>
      <div class="restaurant-detail">
        <p class="restaurant-description" v-if="restaurantData.distance < 20000">現在地から{{ restaurantData.distance }}m</p>
        <p class="restaurant-description">{{ restaurantData.category.join(' ／ ') }}</p>
        <p class="restaurant-description">休：{{ restaurantData.regular_holiday }}</p>
        <tags :tags="tags" />
      </div>
    </div>
  </b-col>
</template>

<script>
import Tags from "@/components/RestaurantList/ListDetail/Tags.vue";
export default {
  components: {
    Tags,
  },
  props: {
    restaurantData: Object,
    tags: Array,
  },
};
</script>

<style scoped>
.item-detail {
  flex: auto;
}

.restaurant-detail {
  margin-top: 10px;
}

.restaurant-name {
  font-size: 25px;
}

.restaurant-description {
  font-size: 15px;
}

@media (max-width: 560px) {
  .restaurant-name {
    font-size: medium;
    font-weight: bold;
  }

  .restaurant-detail {
    margin-top: 5px;
  }

  .restaurant-description {
    font-size: small;
  }
}
</style>