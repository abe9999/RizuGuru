<template>
  <b-col class="tag-outer" @click="tagToggle(index)" sm="6">
    <span class="tag-inner deactive" :class="{ active : state }">{{ name }}</span>
  </b-col>
</template>

<script>
export default {
  props: {
    state: Boolean,
    name: String,
    index: Number,
  },
  methods: {
    tagToggle(index) {
      this.$emit("tagToggle", index);
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