<template>
  <div class="basic">
    <b-col>
      <Label title="店名" :required="true"></Label>
      <Loading v-if="loading" />
      <b-form-select
        v-else-if="!loading"
        v-model="selected"
        :options="options"
        :required="true"
        size="sm"
        class="mt-3"
        @change="select"
      ></b-form-select>
    </b-col>
  </div>
</template>

<script>
import Label from "@/components/Atoms/Label.vue";
import Loading from "@/components/Atoms/Loading.vue";
import { getAllDetail } from "@/plugins/getAllDetail.js";

export default {
  components: {
    Label,
    Loading,
  },
  data() {
    return {
      loading: true,
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
    getAllDetail().then((res) => {
      this.options = res.map((e) => {
        return { value: e.id, text: e.name };
      });
      this.loading = false;
    });
  },
};
</script>

<style scoped>
label {
  margin-left: -15px;
  margin-bottom: -0.5rem;
}
.mt-3 {
  margin-bottom: 10px;
}
</style>