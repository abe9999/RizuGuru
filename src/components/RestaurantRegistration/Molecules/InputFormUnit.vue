<template>
  <div class="wrapper">
    <Label
      :title="title"
      :required="required"
      :cautionMessage="cautionMessage"
    />
    <InputForm
      :getter="getter"
      :setter="setter"
      :propatyName="propatyName"
      :required="required"
      :placeholder="placeholder"
      :validationSetter="validationSetter"
    />
  </div>
</template>

<script>
import Label from "@/components/RestaurantRegistration/Atoms/Label.vue";
import InputForm from "@/components/RestaurantRegistration/Atoms/InputForm.vue";

export default {
  components: {
    Label,
    InputForm,
  },
  props: {
    getter: Function,
    setter: Function,
    propatyName: String,
    title: String,
    required: Boolean,
    placeholder: String,
    cautionMessage: String,
    validationSetter: Function,
  },
};
</script>

<style scoped>
div {
  margin-bottom: 10px;
}

.wrapper {
  width: 100%;
  margin: 0 auto;
}
</style>