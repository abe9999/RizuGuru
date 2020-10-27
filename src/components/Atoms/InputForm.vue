<template>
  <b-col>
    <b-form-input
      v-if="required"
      v-model="value"
      :state="validation"
      :placeholder="placeholder"
      :style="styleObj"
      :disabled="disabled"
    />
    <b-form-input
      v-else
      v-model="value"
      :placeholder="placeholder"
      :disabled="disabled"
    />
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
    propertyName: {
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
      default: () => {},
    },
    styleObj: {
      type: Object,
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
        var value = this.getter(this.propertyName);
        if (this.required) {
          // バリデーション
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.validation = formValidation(this.propertyName, value);
          // 親コンポーネントにバリデーションの結果を渡す
          this.validationSetter({
            propertyName: this.propertyName,
            state: this.validation,
          });
        }
        return value;
      },
      set(value) {
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
  /* スマホ表示時に検索欄をズームさせない */
  font-size: 16px;
  /* --- */
  height: 30px;
  padding-left: 8px;
  margin-bottom: 15px;
  border: 1.5px solid gray;
  border-radius: 3px;
}
</style>