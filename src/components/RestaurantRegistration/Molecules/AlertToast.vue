<template>
  <b-toast static no-auto-hide>
    Hello, world! This is a toast message.
  </b-toast>
</template>

<script>
export default {
  props: {
    alertMessage: {
      type: String,
      required: true,
      default: "AlertMessage",
    },
  },
};
</script>

<style scoped>
</style>