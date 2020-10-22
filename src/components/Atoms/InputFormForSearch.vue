<template>
  <b-input-group>
    <b-form-input
      type="search"
      v-model="value"
      @keydown.enter="searchButtonAction"
    />
    <b-input-group-append>
      <b-button class="button" variant="success" @click="searchButtonAction">
        <b-icon icon="search" />
        <span class="button-message">検索</span>
      </b-button>
      <b-button class="button" @click="action"
        ><b-icon icon="filter-left" />
        <span class="button-message">{{ message }}</span>
      </b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
      default: "message",
    },
    action: {
      type: Function,
      required: true,
    },
    getter: {
      type: Function,
      required: true,
    },
    setter: {
      type: Function,
      required: true,
    },
    searchButtonAction: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      moblie: false,
    };
  },
  methods: {
    test() {
      console.log("tsetest");
    },
  },
  computed: {
    value: {
      get() {
        return this.getter();
      },
      set(value) {
        this.setter(value);
      },
    },
  },
};
</script>

<style scoped>
input {
  /* スマホ表示時に検索欄をズームさせない */
  font-size: 16px;
  /* --- */
}

.button-message {
  margin-left: 5px;
}

@media (max-width: 767px) {
  .button {
    display: none;
  }
}
</style>