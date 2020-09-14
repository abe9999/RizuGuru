<template>
  <div>test page</div>
</template>

<script>
export default {
  mounted() {
    this.$axios
      .get("http://localhost:8080/api/test")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
* {
  text-align: center;
}
</style>