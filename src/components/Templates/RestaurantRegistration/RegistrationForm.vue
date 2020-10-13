<template>
  <div class="basic">
    <section v-for="(form, index) in formList" :key="index">
      <InputFormUnit
        v-if="form.type == 'text'"
        class="form"
        :getter="formValueGetter"
        :setter="formValueSetter"
        :propertyName="form.propertyName"
        :title="form.title"
        :required="form.required"
        :placeholder="form.placeholder"
        :disabled="form.disabled"
        :cautionMessage="form.cautionMessage"
        :validationSetter="formValidationStateSetter"
      />
      <SelectFormUnit
        v-else-if="form.type == 'select'"
        class="form"
        :getter="formValueGetter"
        :setter="formValueSetter"
        :propertyName="form.propertyName"
        :title="form.title"
        :required="form.required"
        :options="form.options"
        :validationSetter="formValidationStateSetter"
      />
      <DatalistFormUnit
        v-else-if="form.type == 'datalist'"
        class="form"
        :value="form.value"
        :setter="formValueSetter"
        :propertyName="form.propertyName"
        :title="form.title"
        :required="form.required"
        :options="form.options"
        :validationSetter="formValidationStateSetter"
        :placeholder="form.placeholder"
        :disabled="form.disabled"
        :cautionMessage="form.cautionMessage"
      />
      <TagFormUnit
        v-else-if="form.type == 'tag'"
        class="form"
        :title="form.title"
        :required="form.required"
        :tagFormList="form.value"
        :action="tagStateSwitcher"
      />
    </section>
  </div>
</template>

<script>
import InputFormUnit from "@/components/Molecules/InputFormUnit.vue";
import SelectFormUnit from "@/components/Molecules/SelectFormUnit.vue";
import DatalistFormUnit from "@/components/Molecules/DatalistFormUnit.vue";
import TagFormUnit from "@/components/Molecules/TagFormUnit.vue";

export default {
  components: {
    InputFormUnit,
    SelectFormUnit,
    DatalistFormUnit,
    TagFormUnit,
  },
  props: {
    formList: Object,
    formValueGetter: Function,
    formValueSetter: Function,
    formValidationStateSetter: Function,
    tagStateSwitcher: Function,
  },
};
</script>

<style scoped>
.form {
  margin-bottom: 25px;
}
</style>