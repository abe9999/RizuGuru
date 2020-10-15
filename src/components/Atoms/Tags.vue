<template>
  <b-row class="wrapper">
    <b-col sm="6" v-for="(tag, index) in tags" :key="index">
      <div class="tag">
        {{ tag }}
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    tags: Array,
  },
};
</script>

<style scoped>
.wrapper {
  width: 90%;
}

.tag {
  margin: 2px -10px;
  padding: 5px;
  font-size: smaller;
  background-color: #689e39;
  border-radius: 5px;
  color: white;
  text-align: center;
}

@media (max-width: 767px) {
  .wrapper {
    width: 100%;
  }

  .tag {
    font-weight: bold;
  }
}
</style>