<template>
  <section class="wrapper">
    <LabelWithIcon
      class="label"
      :title="itemData.displayName"
      :icon="itemData.icon"
    />
    <InputForm
      :getter="getter"
      :setter="setter"
      :propertyName="itemData.propertyName"
      :required="itemData.required"
      :placeholder="itemData.placeholder"
      :validationSetter="itemData.validationSetter"
    />
  </section>
</template>

<script>
import LabelWithIcon from "@/components/Atoms/LabelWithIcon.vue";
import InputForm from "@/components/Atoms/InputForm.vue";

export default {
  components: {
    LabelWithIcon,
    InputForm,
  },
  props: {
    itemData: Object,
    getter: Function,
    setter: Function,
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
}

.label {
  margin-bottom: 25px;
}
</style>