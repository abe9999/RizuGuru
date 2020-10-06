<template>
  <label>
    {{ title }}
    <RequiredStamp v-if="required" />
    <CautionStamp :cautionMessage="cautionMessage" />
  </label>
</template>

<script>
import RequiredStamp from "@/components/Atoms/RequiredStamp.vue";
import CautionStamp from "@/components/Atoms/CautionStamp.vue";

export default {
  components: {
    RequiredStamp,
    CautionStamp,
  },
  props: {
    title: {
      type: String,
      required: true,
      default: "labelTitle",
    },
    required: {
      type: Boolean,
      required: true,
      default: false,
    },
    cautionMessage: {
      type: String,
      required: false,
      default: "",
    },
  },
};
</script>

<style scoped>
label {
  display: flex;
  padding-bottom: 5px;
}
</style>