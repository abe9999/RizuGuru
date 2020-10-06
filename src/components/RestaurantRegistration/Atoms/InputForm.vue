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
  data() {
    return {
      validation: false,
    };
  },
  computed: {
    value: {
      get() {
        // 親コンポーネントから入力値を取得
        return this.getter(this.propatyName);
      },
      set(value) {
        if (this.required) {
          // 入力フォームが必須の場合
          // バリデーション
          this.validation = formValidation(this.propatyName, value);
          // 親コンポーネントにバリデーションの結果を渡す
          this.validationSetter({
            propatyName: this.propatyName,
            state: this.validation,
          });
        }
        // 親コンポーネントに入力値を渡す
        this.setter({ propatyName: this.propatyName, value: value });
      },
    },
  },
  mounted() {
    // 画面表示時にバリデーション実行
    this.validation = formValidation(this.propatyName, this.value);
    // 親コンポーネントにバリデーションの結果を渡す
    this.validationSetter({
      propatyName: this.propatyName,
      state: this.validation,
    });
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