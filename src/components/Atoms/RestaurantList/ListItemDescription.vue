<template>
  <b-col cols="12" md="8">
    <div class="wrapper">
      <div class="container">
        <p class="title">{{ restaurantData.name }}</p>
        <div class="detail-container">
          <p class="description">現在地から{{ distance }}</p>
          <p class="description">{{ genre }}</p>
          <p class="description">休：{{ restaurantData.regularHoliday }}</p>
          <tags :tags="tags" />
        </div>
      </div>
    </div>
  </b-col>
</template>

<script>
import Tags from "@/components/Atoms/Tags.vue";
export default {
  components: {
    Tags,
  },
  props: {
    restaurantData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      genre: "",
      tags: [],
    };
  },
  mounted() {
    this.genre = this.restaurantData.restaurantToGenre
      .map((x) => x.genre.name)
      .join("／");
    this.restaurantData.restaurantToTag.forEach((data) => {
      this.tags.push(data.tag.tagContent);
    });
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
.title {
  font-size: x-large;
}

.detail-container {
  margin-top: 10px;
}

.description {
  font-size: 15px;
}

@media (max-width: 560px) {
  .wrapper {
    width: 100%;
    margin: 0 auto;
  }

  .title {
    font-size: medium;
    font-weight: bold;
    margin-bottom: 0px;
  }

  .detail-container {
    margin-top: 5px;
  }

  .description {
    font-size: small;
    margin-bottom: 0px;
  }
}
</style>