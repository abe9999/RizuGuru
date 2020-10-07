<template>
  <div class="wrapper">
    <Label
      class="label"
      :title="title"
      :required="required"
      :cautionMessage="cautionMessage"
    />
    <InputForm
      :getter="getter"
      :setter="setter"
      :propertyName="propertyName"
      :required="required"
      :placeholder="placeholder"
      :validationSetter="validationSetter"
    />
  </div>
</template>

<script>
import Label from "@/components/Atoms/Label.vue";
import InputForm from "@/components/Atoms/InputForm.vue";

export default {
  components: {
    Label,
    InputForm,
  },
  props: {
    getter: Function,
    setter: Function,
    propertyName: String,
    title: String,
    required: Boolean,
    placeholder: String,
    cautionMessage: String,
    validationSetter: Function,
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  margin: 0 auto;
}

.label {
  margin-bottom: 15px;
}
</style>