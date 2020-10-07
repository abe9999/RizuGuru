<template>
  <b-col>
    <div class="wrapper">
      <vue-slider
        ref="slider"
        v-model="rangeSlider"
        v-bind="options"
        :process-style="{ backgroundColor: '#689e39' }"
        :tooltip-style="{ backgroundColor: '#689e39', borderColor: '#689e39'}"
        :tooltip="'always'"
        :tooltip-placement="'top'"
        :adsorb="true"
        :marks="marks"
        :included="true"
        :hide-label="true"
        :use-keyboard="false"
        :tooltip-formatter="formatter"
      />
    </div>
  </b-col>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
export default {
  components: {
    VueSlider,
  },
  props: {
    getter: {
      type: Function,
      required: true,
    },
    setter: {
      type: Function,
      required: true,
    },
    propertyName: {
      type: String,
      required: true,
    },
    interval: {
      type: Number,
      required: false,
    },
    marks: {
      type: Object,
      required: false,
    },
    data: {
      type: Array,
      required: false,
    },
    min: {
      type: Number,
      required: true,
      default: 0,
    },
    max: {
      type: Number,
      required: true,
      default: 1000,
    },
  },
  data() {
    return {
      options: {
        min: this.min,
        max: this.max,
        interval: this.interval,
        enableCross: false,
      },
    };
  },
  methods: {
    formatter(value) {
      switch (this.propertyName) {
        case "distance":
          if (value < 1000) {
            return `${this.marks[value]}m`;
          } else if (value < 2500) {
            return `${this.marks[value] / 1000}km`;
          } else {
            return `${this.marks[value]}`;
          }
        case "budget":
          return `${value}円`;
      }
    },
  },
  computed: {
    // ストアのゲッター・セッター
    rangeSlider: {
      get() {
        return this.getter(this.propertyName);
      },
      set(value) {
        this.setter({ propertyName: this.propertyName, value: value });
      },
    },
    getWidth() {
      return this.divWidth + "%";
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 90%;
  margin: 0 auto;
}

.vue-slider {
  margin-top: 20px;
}
</style>