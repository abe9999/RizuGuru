<template>
  <div class="wrapper">
    <Label
      class="label"
      :title="title"
      :required="required"
      :cautionMessage="cautionMessage"
    />
    <SelectForm
      :getter="getter"
      :setter="setter"
      :options="options"
      :required="required"
      :propertyName="propertyName"
      :validationSetter="validationSetter"
    />
  </div>
</template>

<script>
import Label from "@/components/Atoms/Label.vue";
import SelectForm from "@/components/Atoms/SelectForm.vue";

export default {
  components: {
    Label,
    SelectForm,
  },
  props: {
    title: String,
    getter: Function,
    setter: Function,
    options: Array,
    propertyName: String,
    required: Boolean,
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