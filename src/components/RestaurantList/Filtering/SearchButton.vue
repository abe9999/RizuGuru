<template>
  <b-container>
    <b-row class="search-button-wrapper">
      <b-col>
        <router-link to="/Restaurantlist" class="search-button" @click.native="clickAction">検索</router-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: {
    action: {
      name: String,
      required: true,
    },
  },
  methods: {
    clickAction() {
      this.$store.dispatch("Filtering/filtered");
      // this.$emit(`${this.actionName}`);
    },
  },
};
</script>

<style scoped>
.search-button-wrapper {
  text-align: center;
  margin: 40px;
}

.search-button {
  padding: 5px 40px;
  color: white;
  font-size: large;
  background-color: #33691e;
  border-radius: 5px;
  display: inline-block;
  text-align: center;
}
</style>