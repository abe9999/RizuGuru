<template>
  <div>
    <vue-slider
      ref="slider"
      v-model="rangeSlider"
      v-bind="options"
      :tooltip="'always'"
      :tooltip-placement="'top'"
      :marks="true"
      :hide-label="true"
      :use-keyboard="false"
      :tooltip-formatter="formatter"
      number
    />
  </div>
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
      required: true,
      default: 100,
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
        adsorb: true,
        enableCross: false,
      },
    };
  },
  methods: {
    formatter(value) {
      switch (this.propertyName) {
        case "distance":
          if (value < 1000) {
            return `${value}m`;
          } else {
            return `${value / 1000}km`;
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
input {
  width: 100%;
  height: 30px;
  margin-bottom: 15px;
}

.icon {
  width: 20px;
  margin-right: 5px;
  vertical-align: middle;
}

.vue-slider {
  margin-top: 20px;
}

.vue-slider-process {
  background-color: #689e39;
}

.vue-slider-dot {
  @at-root &-handle {
    background-color: #689e39;
  }
  @at-root &-focus {
    box-shadow: none;
  }
  @at-root &-disabled {
    cursor: not-allowed;
    background-color: red;
  }
  @at-root &-tooltip {
    @at-root &-inner {
      padding: 5px 15px;
      border-color: #689e39;
      background-color: #689e39;
    }
  }
}
</style>