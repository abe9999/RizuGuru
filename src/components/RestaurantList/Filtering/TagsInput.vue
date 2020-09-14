<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col>
          <InputTitle :individuality="individuality" />
        </b-col>
      </b-row>
      <b-row class="tags-wrapper">
        <Tag
          v-for="(state, index) in states"
          :key="index"
          :state="state.boolean"
          :name="individuality.name[index]"
          :index="index"
          @tagToggle="tagToggle"
        />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import InputTitle from "@/components/RestaurantList/Filtering/InputTitle.vue";
import Tag from "@/components/RestaurantList/Filtering/Tag.vue";
export default {
  components: {
    Tag,
    InputTitle,
  },
  data() {
    return {};
  },
  props: {
    individuality: {
      data: Object,
      required: true,
    },
    states: {
      values: Array,
      required: true,
    },
  },
  methods: {
    tagToggle(index) {
      this.$emit("tagToggle", index);
    },
  },
};
</script>

<style scoped>
.icon {
  width: 20px;
  margin-right: 5px;
  vertical-align: middle;
}

.tags-wrapper {
  margin: 0 auto;
  width: auto;
  background-color: #f6f6f6;
  border-radius: 5px;
}

.tag-outer {
  cursor: pointer;
}

.tag-inner {
  display: inline-block;
  text-align: center;
  width: 90%;
  padding: 15px;
  margin: 3%;
}

.deactive {
  color: black;
  background-color: white;
  border-radius: 5px;
}

.active {
  color: white;
  background-color: #689e39;
  border-radius: 5px;
}

.tags-wrapper,
.search-wrapper {
  text-align: center;
}
</style>