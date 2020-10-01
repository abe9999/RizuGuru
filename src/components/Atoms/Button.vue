<template>
  <b-container>
    <b-row class="search-button-wrapper">
      <b-col>
        <div class="search-button" @click="action">{{ message }}</div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
      default: "Button",
    },
    action: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped>
.search-button-wrapper {
  text-align: center;
  margin-top: 20px;
}

.search-button {
  padding: 5px 40px;
  cursor: pointer;
  color: white;
  font-size: large;
  background-color: #33691e;
  border-radius: 5px;
  display: inline-block;
  text-align: center;
  margin-bottom: 10px;
}
</style>