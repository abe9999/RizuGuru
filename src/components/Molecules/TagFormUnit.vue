<template>
  <div class="wrapper">
    <Label class="label" :title="title" :required="required" />
    <b-row class="form-wrapper">
      <ToggleTag
        v-for="(tagData, index) in tagFormList"
        :key="index"
        :index="index"
        :name="tagData.tagContent"
        :state="tagData.state"
        :action="action"
      />
    </b-row>
  </div>
</template>

<script>
import Label from "@/components/Atoms/Label.vue";
import ToggleTag from "@/components//Atoms/ToggleTag.vue";
export default {
  components: {
    Label,
    ToggleTag,
  },
  props: {
    title: String,
    required: Boolean,
    tagFormList: {
      type: Array,
      required: true,
    },
    state: Boolean,
    action: Function,
  },
};
</script>

<style scoped>
.form-wrapper {
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 2.5%;
  background-color: #f6f6f6;
  border-radius: 5px;
}

.label {
  margin-bottom: 15px;
}
</style>
