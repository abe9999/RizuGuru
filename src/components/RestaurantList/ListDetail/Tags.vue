<template>
  <div class="tags">
    <p v-for="(tag, index) in tags" :key="index">{{ tag }}</p>
  </div>
</template>

<script>
export default {
  props: {
    tags: Array,
  },
};
</script>

<style scoped>
.tags p {
  width: 43%;
  display: inline-block;
  margin: 5px 2.5px;
  padding: 5px;
  font-size: smaller;
  background-color: #689e39;
  border-radius: 5px;
  color: white;
  text-align: center;
}

@media (max-width: 560px) {
  .tags p {
    font-size: 10px;
    font-weight: bold;
  }
}
</style>