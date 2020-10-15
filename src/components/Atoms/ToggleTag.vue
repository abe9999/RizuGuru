<template>
  <b-col class="tag-outer" :lg="dataLength">
    <span
      class="tag-inner deactive"
      :class="{ active: active }"
      @click="action(index)"
      >{{ name }}</span
    >
  </b-col>
</template>

<script>
export default {
  props: {
    dataLength: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: false,
    },
    name: {
      type: String,
      required: true,
      default: "tagName",
    },
    state: {
      type: Boolean,
      required: true,
    },
    action: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      active: this.state,
    };
  },
  watch: {
    state(bool) {
      this.active = bool;
    },
  },
};
</script>

<style scoped>
.tag-outer {
  cursor: pointer;
}

.tag-inner {
  display: inline-block;
  text-align: center;
  width: 90%;
  padding: 15px;
  margin: 3%;
}

.deactive {
  color: black;
  background-color: white;
  border-radius: 5px;
}

.active {
  color: white;
  background-color: #689e39;
  border-radius: 5px;
}

.tags-wrapper,
.search-wrapper {
  text-align: center;
}
</style>