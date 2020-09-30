<template>
  <b-input-group>
    <b-form-input></b-form-input>
    <b-input-group-append>
      <b-button variant="success" @click="action">{{ message }}</b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
      default: "message",
    },
    action: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped>
</style>