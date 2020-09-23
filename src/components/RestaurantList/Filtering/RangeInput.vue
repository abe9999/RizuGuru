<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col>
          <InputTitle :individuality="individuality" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
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
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import InputTitle from "@/components/RestaurantList/Filtering/InputTitle.vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default {
  components: {
    InputTitle,
    VueSlider,
  },
  data() {
    return {
      options: {
        min: this.individuality.min,
        max: this.individuality.max,
        interval: this.individuality.interval,
        adsorb: true,
        enableCross: false,
      },
    };
  },
  props: {
    type: {
      name: String,
      required: true,
    },
    individuality: {
      data: Object,
      required: true,
    },
    state: {
      value: Number,
      required: true,
    },
  },
  methods: {
    formatter(value) {
      switch (this.type) {
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
        var value = this.state.value;
        return value;
      },
      set(value) {
        this.$emit("setRange", this.type, value);
      },
    },
    getWidth() {
      return this.divWidth + "%";
    },
  },
};
</script>

<style lang="scss">
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