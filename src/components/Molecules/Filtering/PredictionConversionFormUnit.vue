<template>
  <section class="wrapper">
    <LabelWithIcon
      class="label"
      :title="itemData.displayName"
      :icon="itemData.icon"
    />
    <section v-if="selectedWord !== ''" @click="deleteSelectedWord">
      <p class="selected-word">
        {{ selectedWord }}<b-icon icon="x" class="icon" />
      </p>
    </section>
    <section v-if="selectedWord === ''" class="prediction-wrapper">
      <section class="prediction-top-container">
        <InputForm
          :getter="getInputWord"
          :setter="setInputWord"
          :debounce="500"
          :propertyName="itemData.propertyName"
          :required="itemData.required"
          :placeholder="itemData.placeholder"
          :validationSetter="itemData.validationSetter"
        />
      </section>
      <section v-if="predictionList.length" class="prediction-bottom-container">
        <p class="prediction-information">
          <b-icon icon="info-circle-fill" class="icon" />
          {{ predictionInformation }}
        </p>
        <section class="prediction-word-container">
          <p
            class="prediction-word"
            v-for="predictionWord in predictionList"
            :key="predictionWord.id"
            @click="selectSelectedWord(predictionWord)"
          >
            {{ predictionWord.name }}
          </p>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import LabelWithIcon from "@/components/Atoms/LabelWithIcon.vue";
import InputForm from "@/components/Atoms/InputForm.vue";

export default {
  components: {
    LabelWithIcon,
    InputForm,
  },
  props: {
    itemData: Object,
    setter: Function,
    api: Function,
    predictionInformation: String,
  },
  data() {
    return {
      inputWord: "",
      selectedWord: "",
      predictionList: [],
      loading: false,
    };
  },
  methods: {
    getInputWord() {
      return this.inputWord;
    },
    setInputWord({ value }) {
      this.inputWord = value;
      this.predictionList = [];
      if (value !== "") {
        this.api(value).then((res) => {
          this.predictionList.push(...res.slice(0, 20));
        });
      }
    },
    selectSelectedWord(predictionWord) {
      this.selectedWord = predictionWord.name;
    },
    deleteSelectedWord() {
      this.selectedWord = "";
    },
  },
  watch: {
    selectedWord(word) {
      this.setter({ propertyName: this.itemData.propertyName, value: word });
    },
  },
  mounted() {
    this.selectedWord = this.itemData.value;
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
}

.label {
  margin-bottom: 25px;
}

.icon {
  margin: 0 5px;
}

.selected-word {
  display: inline-block;
  padding: 5px 10px;
  margin: 2.5px 20px;
  font-size: 15px;
  cursor: pointer;
  color: white;
  background-color: #689e39;
  border-radius: 2.5px;
}

.selected-word:hover {
  opacity: 0.5;
  text-decoration: line-through;
}

.prediction-wrapper {
  position: relative;
}

.prediction-bottom-container {
  position: absolute;
  z-index: 100;
  width: 100%;
  padding: 5px;
  background-color: #eee;
  border-radius: 5px;
}

/* 吹き出しの三角部分 */
.prediction-bottom-container:after {
  position: absolute;
  content: "";
  top: -20px;
  left: 50px;
  transform: rotate(180deg);
  border-style: solid;
  border-color: #eee transparent transparent transparent;
  border-width: 20px 20px 0 20px;
}

.prediction-information {
  margin: 5px;
  font-size: 18px;
  font-weight: bold;
}

.prediction-word-container {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
}

.prediction-word {
  width: 25%;
  padding: 5px 10px;
  margin: 2.5px 0;
  cursor: pointer;
  font-size: 15px;
  text-align: center;
  background-color: white;
  border: #eee solid;
}

@media (min-width: 767px) {
  .prediction-word:hover {
    color: white;
    background-color: gray;
  }
}

@media (max-width: 767px) {
  .prediction-word {
    width: 50%;
  }
}
</style>