<template>
  <b-col>
    <b-form-input
      v-if="required"
      v-model="value"
      debounce="250"
      :state="validation"
      :placeholder="placeholder"
    />
    <b-form-input
      v-else
      v-model="value"
      debounce="250"
      :placeholder="placeholder"
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
    propatyName: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      required: false,
    },
    placeholder: {
      type: String,
      required: true,
      default: "placeholder",
    },
    validationSetter: {
      type: Function,
      required: false,
    },
  },
  computed: {
    value: {
      get() {
        return this.getter(this.propatyName);
      },
      set(value) {
        this.setter({ propatyName: this.propatyName, value: value });
      },
    },
    validation() {
      const value = this.getter(this.propatyName);
      if (value && value.length > 0) {
        switch (this.propatyName) {
          case "name":
            this.validationSetter({
              propatyName: this.propatyName,
              state: true,
            });
            return true;
          case "nameKana":
            // eslint-disable-next-line no-irregular-whitespace
            if (value.match(/^[ァ-ヶー　]+$/)) {
              this.validationSetter({
                propatyName: this.propatyName,
                state: true,
              });
              return true;
            } else {
              this.validationSetter({
                propatyName: this.propatyName,
                state: false,
              });
              return false;
            }
          case "phoneNumber":
            if (
              value.match(/^0\d{2,3}-\d{1,4}-\d{4}$/) ||
              value.match(/^0\d{1}-\d{4}-\d{4}$/) ||
              value.match(/^0\d{2}-\d{4}-\d{4}$/) ||
              value.match(/^0\d{3}-\d{6}$/)
            ) {
              this.validationSetter({
                propatyName: this.propatyName,
                state: true,
              });
              return true;
            } else {
              this.validationSetter({
                propatyName: this.propatyName,
                state: false,
              });
              return false;
            }
          case "address":
            this.validationSetter({
              propatyName: this.propatyName,
              state: true,
            });
            return true;
          case "openingHours":
            this.validationSetter({
              propatyName: this.propatyName,
              state: true,
            });
            return true;
          case "regularHoliday":
            this.validationSetter({
              propatyName: this.propatyName,
              state: true,
            });
            return true;
          case "price":
            if (value <= 1000 && value.match(/\d/)) {
              this.validationSetter({
                propatyName: this.propatyName,
                state: true,
              });
              return true;
            } else {
              this.validationSetter({
                propatyName: this.propatyName,
                state: false,
              });
              return false;
            }
          default:
            this.validationSetter({
              propatyName: this.propatyName,
              state: false,
            });
            return false;
        }
      } else {
        this.validationSetter({ propatyName: this.propatyName, state: false });
        return false;
      }
    },
  },
};
</script>

<style scoped>
input {
  width: 90%;
  height: 30px;
  padding-left: 8px;
  margin-bottom: 15px;
  border: 1.5px solid gray;
  border-radius: 3px;
}
</style>