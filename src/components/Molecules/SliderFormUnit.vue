<template>
  <div class="wrapper">
    <LabelWithIcon
      class="label"
      :title="itemData.displayName"
      :icon="itemData.icon"
    />
    <SliderForm
      :getter="getter"
      :setter="setter"
      :propertyName="itemData.propertyName"
      :interval="itemData.interval"
      :marks="itemData.marks"
      :min="itemData.min"
      :max="itemData.max"
    />
  </div>
</template>

<script>
import LabelWithIcon from "@/components/Atoms/LabelWithIcon.vue";
import SliderForm from "@/components/Atoms/SliderForm.vue";

export default {
  components: {
    LabelWithIcon,
    SliderForm,
  },
  props: {
    getter: Function,
    setter: Function,
    itemData: Object,
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
}

.label {
  margin-bottom: 15px;
}
</style>