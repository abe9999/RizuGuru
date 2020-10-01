<template>
  <b-input-group>
    <b-form-input
      type="search"
      v-model="value"
      @keydown.enter="searchButtonAction"
    ></b-form-input>
    <b-input-group-prepend is-text class="icon" @click="searchButtonAction">
      <b-icon icon="search"></b-icon>
    </b-input-group-prepend>
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
    getter: {
      type: Function,
      required: true,
    },
    setter: {
      type: Function,
      required: true,
    },
    searchButtonAction: {
      type: Function,
      required: true,
    },
  },
  computed: {
    value: {
      get() {
        return this.getter();
      },
      set(value) {
        this.setter(value);
      },
    },
  },
};
</script>

<style scoped>
.icon {
  cursor: pointer;
}
</style>