<template>
  <b-col>
    <b-form-select
      v-if="required"
      :options="options"
      :state="validation"
      v-model="value"
      value-field="id"
      text-field="name"
      size="sm"
    />
    <b-form-select
      v-else
      :options="options"
      v-model="value"
      value-field="id"
      text-field="name"
      size="sm"
    />
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
        this.validationSetter({ propertyName: this.propertyName, state: false });
        return false;
      }
    },
  },
};
</script>

<style scoped>
select {
  width: 90%;
  height: 30px;
  margin-bottom: 15px;
  border: 1.5px solid gray;
  border-radius: 3px;
}
</style>

