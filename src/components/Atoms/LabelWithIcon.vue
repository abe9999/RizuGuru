<template>
  <label>
    <div class="wrapper">
      <img :src="icon" class="icon" />
      <label>{{ title }}</label>
    </div>
  </label>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: "labelTitle",
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.wrapper {
  margin-bottom: 20px;
}

.icon {
  width: 20px;
  margin-right: 5px;
  vertical-align: middle;
}
</style>