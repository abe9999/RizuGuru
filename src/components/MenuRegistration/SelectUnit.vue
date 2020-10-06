<template>
  <div class="basic">
    <b-col>
      <Label title="店名" :required="true"></Label>
      <b-form-select
        v-model="selected"
        :options="options"
        size="sm"
        class="mt-3"
        @change="select"
      ></b-form-select>
    </b-col>
  </div>
</template>

<script>
import Label from "@/components/RestaurantRegistration/Atoms/Label.vue";
import { getAllDetail } from "@/plugins/getAllDetail.js";

export default {
  components: {
    Label,
  },
  data() {
    return {
      options: [],
      selected: "",
    };
  },
  methods: {
    select() {
      this.$emit("select", this.selected);
    },
  },
  mounted() {
    getAllDetail().then(
      (res) =>
        (this.options = res.map((e) => {
          return { value: e.id, text: e.name };
        }))
    );
  },
};
</script>

<style scoped>
label {
  margin-left: -15px;
  margin-bottom: -0.5rem;
}
.mt-3 {
  width: 98%;
  margin-bottom: 10px;
}
</style>