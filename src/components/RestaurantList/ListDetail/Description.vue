<template>
  <b-col>
    <div class="item-detail">
      <p class="restaurant-name">{{ restaurantData.name }}</p>
      <div class="restaurant-detail">
        <p class="restaurant-description">現在地から{{ distance }}</p>
        <p class="restaurant-description">{{ genre }}</p>
        <p class="restaurant-description">休：{{ restaurantData.regularHoliday }}</p>
        <tags :tags="tags" />
      </div>
    </div>
  </b-col>
</template>

<script>
import Tags from "@/components/RestaurantList/ListDetail/Tags.vue";
export default {
  data() {
    return {
      genre: "",
    };
  },
  components: {
    Tags,
  },
  props: {
    restaurantData: Object,
    tags: Array,
  },
  mounted() {
    var genres = [];
    this.restaurantData.restaurantToGenre.forEach((data) =>
      genres.push(data.genre.name)
    );
    this.genre = genres.join(" ／ ");
  },
  computed: {
    distance() {
      if (this.restaurantData.distance >= 1000) {
        return (this.restaurantData.distance / 1000).toFixed(1) + "km";
      } else {
        return this.restaurantData.distance + "m";
      }
    },
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