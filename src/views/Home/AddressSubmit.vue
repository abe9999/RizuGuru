<template>
  <section class="wrapper">
    <Headline headline="登録テスト" />
    <SubHead subHead="住所登録" />
    <SelectFormUnit
      :title="prefecture.title"
      :getter="getSelectFormValue"
      :setter="setSelectFormValue"
      :validationSetter="setValidationState"
      :options="prefecture.options"
      :propertyName="prefecture.propertyName"
      :required="prefecture.required"
    />
    <DatalistFormUnit
      :title="city.title"
      :value="city.value"
      :setter="setSelectFormValue"
      :validationSetter="setValidationState"
      :options="city.options"
      :propertyName="city.propertyName"
      :required="city.required"
      :placeholder="city.placeholder"
      :disabled="city.disabled"
      :cautionMessage="city.cautionMessage"
    />
    <DatalistFormUnit
      :title="town.title"
      :value="town.value"
      :setter="setSelectFormValue"
      :validationSetter="setValidationState"
      :options="town.options"
      :propertyName="town.propertyName"
      :required="town.required"
      :placeholder="town.placeholder"
      :disabled="town.disabled"
      :cautionMessage="town.cautionMessage"
    />
    <InputFormUnit
      :title="buildingName.title"
      :getter="getSelectFormValue"
      :setter="setSelectFormValue"
      :options="buildingName.options"
      :propertyName="buildingName.propertyName"
      :required="buildingName.required"
      :placeholder="buildingName.placeholder"
      :disabled="buildingName.disabled"
      :cautionMessage="buildingName.cautionMessage"
    />
    <b-row>
      <b-col>
        <b-button @click="reset">リセット</b-button>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import Headline from "@/components/Molecules/Headline.vue";
import SubHead from "@/components/Molecules/SubHead.vue";
import SelectFormUnit from "@/components/Molecules/SelectFormUnit.vue";
import DatalistFormUnit from "@/components/Molecules/DatalistFormUnit.vue";
import InputFormUnit from "@/components/Molecules/InputFormUnit.vue";
export default {
  components: {
    Headline,
    SubHead,
    SelectFormUnit,
    DatalistFormUnit,
    InputFormUnit,
  },
  data() {
    return {
      prefecture: {
        title: "都道府県",
        required: true,
        propertyName: "prefecture",
        value: null,
        validationState: false,
        options: [],
      },
      city: {
        title: "市区町村",
        required: true,
        propertyName: "city",
        value: "",
        validationState: false,
        options: [],
        placeholder: "都道府県を選択してください",
        disabled: true,
        cautionMessage: "（例）新宿区",
      },
      town: {
        title: "町名・番地",
        required: true,
        propertyName: "town",
        value: "",
        validationState: false,
        options: [],
        placeholder: "市区町村を入力してください",
        disabled: true,
        cautionMessage: "（例）四谷2-4-1",
      },
      buildingName: {
        title: "建物名・階数",
        required: false,
        propertyName: "buildingName",
        value: "",
        validationState: false,
        options: [],
        placeholder: "町名・番地を入力してください",
        disabled: true,
        cautionMessage: "（例）ACN四谷ビル6F",
      },
    };
  },
  methods: {
    getSelectFormValue(propertyName) {
      return this[`${propertyName}`].value;
    },
    setSelectFormValue(obj) {
      this[`${obj.propertyName}`].value = obj.value;
    },
    setValidationState(obj) {
      this[`${obj.propertyName}`].validationState = obj.state;
    },
    fetchPrefecture() {
      this.$axios
        .get(
          "https://func-rizugurugeoapi.azurewebsites.net/api/getPrefectureList?"
        )
        .then((res) => {
          var prefectureArr = res.data
            .filter((x) => x.activeKey == 1)
            .map((x) => ({ id: x.id, name: x.name }));
          prefectureArr.unshift({ id: null, name: "未選択" });
          this.prefecture.options = prefectureArr;
        });
    },
    fetchCity(prefId) {
      this.city.options = [];
      this.town.options = [];
      this.$axios
        .get(
          `https://func-rizugurugeoapi.azurewebsites.net/api/getCityList?prefId=${prefId}`
        )
        .then((res) => {
          var cityArr = res.data.map((x) => ({
            text: x.nameKana,
            value: x.name,
          }));
          this.city.options = cityArr;
          this.city.disabled = false;
          this.city.placeholder = "市区町村を入力してください";
        });
    },
    fetchTown(cityName) {
      this.town.options = [];
      this.$axios
        .get(
          `https://func-rizugurugeoapi.azurewebsites.net/api/getTownList?cityName=${cityName}`
        )
        .then((res) => {
          var townArr = res.data.map((x) => x.town);
          townArr.map((x) =>
            x.map((y) =>
              this.town.options.push({ text: y.nameKana, value: y.name })
            )
          );
          this.town.disabled = false;
          this.town.placeholder = "町名を入力してください";
        });
    },
    reset() {
      this.prefecture.value = null;
    },
  },
  mounted() {
    this.fetchPrefecture();
  },
  watch: {
    "prefecture.value"(value) {
      if (value != null) {
        this.fetchCity(value);
      } else {
        this.city.options = [];
        this.city.disabled = true;
        this.city.placeholder = "都道府県を選択してください";
      }
      this.city.value = "";
    },
    "city.value"(value) {
      if (value != "") {
        this.fetchTown(value);
      } else {
        this.town.options = [];
        this.town.disabled = true;
        this.town.placeholder = "市区町村を入力してください";
      }
      this.town.value = "";
    },
    "town.value"(value) {
      if (value != "") {
        this.buildingName.disabled = false;
        this.buildingName.placeholder = "建物名・階数を入力してください";
      } else {
        this.buildingName.disabled = true;
        this.buildingName.placeholder = "町名を入力してください";
      }
      this.buildingName.value = "";
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 95%;
  margin: 0 auto;
  margin-top: 20px;
  font-size: 0.9em;
}
</style>