<template>
  <div class="wrapper">
    <LabelWithIcon :title="itemData.displayName" :icon="itemData.icon" />
    <SliderForm
      :getter="getter"
      :setter="setter"
      :propertyName="itemData.propertyName"
      :interval="itemData.interval"
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

<style lang="scss" scoped>
div {
  margin-bottom: 10px;
}

.wrapper {
  width: 100%;
}
</style>