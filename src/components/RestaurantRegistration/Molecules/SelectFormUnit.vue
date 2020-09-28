<template>
  <div class="wrapper">
    <Label :title="title" :required="required" />
    <SelectForm
      :getter="getter"
      :setter="setter"
      :options="options"
      :required="required"
      :propatyName="propatyName"
      :validationSetter="validationSetter"
    />
  </div>
</template>

<script>
import Label from "@/components/RestaurantRegistration/Atoms/Label.vue";
import SelectForm from "@/components/RestaurantRegistration/Atoms/SelectForm.vue";

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
    propatyName: String,
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
  width: 90%;
}
</style>