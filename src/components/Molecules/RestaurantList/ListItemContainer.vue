<template>
  <b-row @click="action" class="item">
    <ListItemImage :imageId="restaurantData.id" />
    <ListItemDescription :restaurantData="restaurantData" />
  </b-row>
</template>

<script>
import ListItemImage from "@/components/Atoms/RestaurantList/ListItemImage.vue";
import ListItemDescription from "@/components/Atoms/RestaurantList/ListItemDescription.vue";
export default {
  components: {
    ListItemImage,
    ListItemDescription,
  },
  data() {
    return {
      tags: [],
    };
  },
  props: {
    restaurantData: Object,
  },
  methods: {
    action() {
      this.$router.push(`/Restaurant/Detail/${this.restaurantData.id}`);
    },
  },
};
</script>

<style scoped>
.item {
  width: 90%;
  cursor: pointer;
  padding: 15px;
  background-color: #f6f6f6;
  border-radius: 15px;
  margin: 0 auto;
}

@media (max-width: 560px) {
  .item {
    width: 100%;
    margin: 0 auto;
  }
}
</style>