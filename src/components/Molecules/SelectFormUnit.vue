<template>
  <div class="wrapper">
    <Label :title="title" :required="required" />
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
    validationSetter: Function,
  },
};
</script>

<style scoped>
select {
  width: 90%;
  height: 30px;
  margin-bottom: 15px;
  border: 1.5px solid gray;
  border-radius: 3px;
}

.wrapper {
  width: 100%;
  margin: 0 auto;
}
</style>