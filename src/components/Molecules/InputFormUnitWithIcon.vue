<template>
  <div class="wrapper">
    <LabelWithIcon :title="itemData.displayName" :icon="itemData.icon" />
    <InputForm
      :getter="getter"
      :setter="setter"
      :propertyName="itemData.propertyName"
      :required="itemData.required"
      :placeholder="itemData.placeholder"
      :validationSetter="itemData.validationSetter"
    />
  </div>
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
div {
  margin-bottom: 10px;
}

.wrapper {
  width: 90%;
}
</style>