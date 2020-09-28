<template>
  <div class="basic">
    <InputFormUnit
      v-for="(textForm, index) in textFormList"
      :key="index"
      :getter="textFormGetter"
      :setter="textFormSetter"
      :propatyName="textForm.propatyName"
      :title="textForm.title"
      :required="textForm.required"
      :placeholder="textForm.placeholder"
      :cautionMessage="textForm.cautionMessage"
      :validationSetter="textFormValidationStateSetter"
    />
  </div>
</template>

<script>
import InputFormUnit from "@/components/RestaurantRegistration/Molecules/InputFormUnit.vue";

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
};
</script>