<template>
  <b-col>
    <b-form-input
      :list="propertyName"
      v-if="required"
      v-model="value"
      debounce="500"
      :state="validation"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <b-form-input
      :list="propertyName"
      v-else
      v-model="value"
      debounce="500"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <b-form-datalist :id="propertyName" :options="options" />
  </b-col>
</template>

<script>
import { formValidation } from "@/plugins/formValidation.js";
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
  data() {
    return {
      validation: false,
    };
  },
  computed: {
    value: {
      get() {
        // 親コンポーネントから入力値を取得
        return this.getter(this.propertyName);
      },
      set(value) {
        if (this.required) {
          // 入力フォームが必須の場合
          // バリデーション
          this.validation = formValidation(this.propertyName, value);
          // 親コンポーネントにバリデーションの結果を渡す
          this.validationSetter({
            propertyName: this.propertyName,
            state: this.validation,
          });
        }
        // 親コンポーネントに入力値を渡す
        this.setter({ propertyName: this.propertyName, value: value });
      },
    },
  },
  mounted() {
    if (this.required) {
      // 入力フォームが必須の場合
      // 画面表示時にバリデーション実行
      this.validation = formValidation(this.propertyName, this.value);
      // 親コンポーネントにバリデーションの結果を渡す
      this.validationSetter({
        propertyName: this.propertyName,
        state: this.validation,
      });
    }
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

