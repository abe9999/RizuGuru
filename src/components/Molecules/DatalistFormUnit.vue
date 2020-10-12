<template>
  <div class="wrapper">
    <b-form-group>
      <Label
        class="label"
        :title="title"
        :required="required"
        :cautionMessage="cautionMessage"
      />
      <DatalistForm
        :getter="getter"
        :setter="setter"
        :options="options"
        :required="required"
        :propertyName="propertyName"
        :validationSetter="validationSetter"
        :placeholder="placeholder"
        :disabled="disabled"
      />
    </b-form-group>
  </div>
</template>

<script>
import Label from "@/components/Atoms/Label.vue";
import DatalistForm from "@/components/Atoms/DatalistForm.vue";

export default {
  components: {
    Label,
    DatalistForm,
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
    placeholder: String,
    disabled: Boolean,
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