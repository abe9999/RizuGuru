<template>
  <div class="basic">
    <InputFormUnit
      class="form"
      v-for="(textForm, index) in textFormList"
      :key="index"
      :getter="textFormGetter"
      :setter="textFormSetter"
      :propertyName="textForm.propertyName"
      :title="textForm.title"
      :required="textForm.required"
      :placeholder="textForm.placeholder"
      :cautionMessage="textForm.cautionMessage"
      :validationSetter="textFormValidationStateSetter"
    />
    <SelectFormUnit
      class="form"
      v-for="(selectForm, index) in selectFormList"
      :key="index"
      :getter="selectFormGetter"
      :setter="selectFormSetter"
      :propertyName="selectForm.propertyName"
      :title="selectForm.title"
      :required="selectForm.required"
      :options="genreOptions"
      :validationSetter="selectFormValidationStateSetter"
    />
    <TagFormUnit
      class="form"
      :title="tagFormList.title"
      :required="tagFormList.required"
      :tagFormList="tagFormList.data"
      :action="tagStateSwitcher"
    />
  </div>
</template>

<script>
import InputFormUnit from "@/components/Molecules/InputFormUnit.vue";
import SelectFormUnit from "@/components/Molecules/SelectFormUnit.vue";
import TagFormUnit from "@/components/Molecules/TagFormUnit.vue";

export default {
  components: {
    InputFormUnit,
    SelectFormUnit,
    TagFormUnit,
  },
  props: {
    textFormGetter: Function,
    textFormSetter: Function,
    textFormValidationStateSetter: Function,
    selectFormGetter: Function,
    selectFormSetter: Function,
    selectFormValidationStateSetter: Function,
    textFormList: Object,
    selectFormList: Object,
    tagFormList: Object,
    tagStateSwitcher: Function,
    genreOptions: Array,
  },
};
</script>

<style scoped>
.form {
  margin-bottom: 25px;
}
</style>