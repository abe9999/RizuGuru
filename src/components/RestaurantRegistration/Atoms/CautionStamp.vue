<template>
  <span class="caution">{{ cautionMessage }}</span>
</template>

<script>
export default {
  props: {
    cautionMessage: {
      type: String,
      required: true,
      default: "",
    },
  },
};
</script>

<style scoped>
.caution {
  margin-left: 10px;
  color: gray;
}
</style>