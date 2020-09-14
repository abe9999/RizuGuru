<template>
  <div class="input-title">
    <img :src="individuality.icon" class="icon" />
    <label>{{ individuality.title }}</label>
  </div>
</template>

<script>
export default {
  props: {
    individuality: {
      title: {
        name: String,
        required: true,
      },
      icon: {
        directory: String,
        required: true,
      },
    },
  },
};
</script>

<style scoped>
.input-title {
  margin-bottom: 20px;
}

.icon {
  width: 20px;
  margin-right: 5px;
  vertical-align: middle;
}
</style>