<template>
  <div class="basic">
    <section v-for="(form, index) in formList" :key="index">
      <InputFormUnit
        v-if="form.type == 'text'"
        class="form"
        :getter="formValueGetter"
        :setter="formValueSetter"
        :propertyName="form.propertyName"
        :title="form.title"
        :required="form.required"
        :placeholder="form.placeholder"
        :disabled="form.disabled"
        :cautionMessage="form.cautionMessage"
        :validationSetter="formValidationStateSetter"
      />
    </section>
  </div>
</template>

<script>
import InputFormUnit from "@/components/Molecules/InputFormUnit.vue";

export default {
  components: {
    InputFormUnit,
  },
  props: {
    formList: Object,
    formValueGetter: Function,
    formValueSetter: Function,
    formValidationStateSetter: Function,
  },
};
</script>

<style scoped>
.basic {
  width: 100%;
  text-align: center;
}
</style>