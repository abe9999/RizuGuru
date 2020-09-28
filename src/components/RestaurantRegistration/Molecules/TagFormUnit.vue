<template>
  <div class="wrapper">
    <Label :title="title" :required="required" />
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
import Label from "@/components/RestaurantRegistration/Atoms/Label.vue";
import ToggleTag from "@/components/RestaurantRegistration/Atoms/ToggleTag.vue";
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
.wrapper {
  width: 80%;
}
.form-wrapper {
  background-color: #f6f6f6;
  border-radius: 5px;
}
</style>
