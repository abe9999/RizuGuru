<template>
  <b-col>
    <b-form-input
      :list="propertyName"
      v-if="required"
      v-model="value"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <b-form-input
      :list="propertyName"
      v-else
      v-model="value"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <b-form-datalist :id="propertyName" :options="options" />
  </b-col>
</template>

<script>
export default {
  props: {
    getter: {
      type: Function,
      required: true,
    },
    setter: {
      type: Function,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    propertyName: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      required: false,
    },
    validationSetter: {
      type: Function,
      required: false,
      default: () => {},
    },
    placeholder: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    value: {
      get() {
        return this.getter(this.propertyName);
      },
      set(value) {
        this.setter({ propertyName: this.propertyName, value: value });
      },
    },
    validation() {
      if (this.getter(this.propertyName)) {
        this.validationSetter({ propertyName: this.propertyName, state: true });
        return true;
      } else {
        this.validationSetter({
          propertyName: this.propertyName,
          state: false,
        });
        return false;
      }
    },
  },
};
</script>

<style scoped>
input {
  width: 100%;
  height: 30px;
  border: 1.5px solid gray;
  border-radius: 3px;
}
</style>

