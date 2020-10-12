<template>
  <div class="basic">
    <InputFormUnit
      v-for="(textForm, index) in textFormList"
      :key="index"
      :getter="textFormGetter"
      :setter="textFormSetter"
      :propertyName="textForm.propertyName"
      :title="textForm.title"
      :required="textForm.required"
      :placeholder="textForm.placeholder"
      :cautionMessage="textForm.cautionMessage"
      :validationSetter="textFormValidationStateSetter"
    />
  </div>
</template>

<script>
import InputFormUnit from "@/components/Molecules/InputFormUnit.vue";

export default {
  components: {
    InputFormUnit,
  },
  props: {
    textFormGetter: Function,
    textFormSetter: Function,
    textFormValidationStateSetter: Function,
    textFormList: Object,
  },
  data() {
    return {
      styleObj: { width: "91%", marginRight: "9%" },
    };
  },
};
</script>

<style scoped>
.basic {
  width: 100%;
  text-align: center;
}
</style>