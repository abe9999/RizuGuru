<template>
  <div class="basic">
    <InputFormUnit
      v-for="(textForm, index) in textFormList"
      :key="index"
      :getter="textFormGetter"
      :setter="textFormSetter"
      :propatyName="textForm.propatyName"
      :title="textForm.title"
      :required="textForm.required"
      :placeholder="textForm.placeholder"
      :cautionMessage="textForm.cautionMessage"
      :validationSetter="textFormValidationStateSetter"
    />
    <SelectFormUnit
      v-for="(selectForm, index) in selectFormList"
      :key="index"
      :getter="selectFormGetter"
      :setter="selectFormSetter"
      :propatyName="selectForm.propatyName"
      :title="selectForm.title"
      :required="selectForm.required"
      :options="genreOptions"
      :validationSetter="selectFormValidationStateSetter"
    />
    <TagFormUnit
      :title="tagFormList.title"
      :required="tagFormList.required"
      :tagFormList="tagFormList.data"
      :action="tagStateSwitcher"
    />
  </div>
</template>

<script>
import InputFormUnit from "@/components/RestaurantRegistration/Molecules/InputFormUnit.vue";
import SelectFormUnit from "@/components/RestaurantRegistration/Molecules/SelectFormUnit.vue";
import TagFormUnit from "@/components/RestaurantRegistration/Molecules/TagFormUnit.vue";

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