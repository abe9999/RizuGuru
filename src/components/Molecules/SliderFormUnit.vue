<template>
  <div class="wrapper">
    <b-container fluid>
      <b-row>
        <b-col>
          <LabelWithIcon :title="itemData.displayName" :icon="itemData.icon" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <SliderForm
            :getter="getter"
            :setter="setter"
            :propertyName="itemData.propertyName"
            :interval="itemData.interval"
            :min="itemData.min"
            :max="itemData.max"
          />
        </b-col>
      </b-row>
    </b-container>
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
.wrapper {
  width: 90%;
}
// input {
//   width: 100%;
//   height: 30px;
//   margin-bottom: 15px;
// }

// .icon {
//   width: 20px;
//   margin-right: 5px;
//   vertical-align: middle;
// }

// .vue-slider {
//   margin-top: 20px;
// }

// .vue-slider-process {
//   background-color: #689e39;
// }

// .vue-slider-dot {
//   @at-root &-handle {
//     background-color: #689e39;
//   }
//   @at-root &-focus {
//     box-shadow: none;
//   }
//   @at-root &-disabled {
//     cursor: not-allowed;
//     background-color: red;
//   }
//   @at-root &-tooltip {
//     @at-root &-inner {
//       padding: 5px 15px;
//       border-color: #689e39;
//       background-color: #689e39;
//     }
//   }
// }
</style>