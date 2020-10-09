<template>
  <section class="wrapper">
    <Headline headline="登録テスト" />
    <SubHead subHead="住所登録" />
    <SelectFormUnit
      :title="prefecture.title"
      :getter="getSelectFormValue"
      :setter="setSelectFormValue"
      :options="prefecture.options"
      :propertyName="prefecture.propertyName"
      :required="prefecture.required"
    />
    <DatalistFormUnit
      :title="city.title"
      :getter="getSelectFormValue"
      :setter="setSelectFormValue"
      :options="city.options"
      :propertyName="city.propertyName"
      :required="city.required"
      placeholder="都道府県を選択してください"
      :disabled="city.disabled"
    />
    <DatalistFormUnit
      :title="town.title"
      :getter="getSelectFormValue"
      :setter="setSelectFormValue"
      :options="town.options"
      :propertyName="town.propertyName"
      :required="town.required"
      placeholder="市区町村を選択してください"
      :disabled="town.disabled"
    />
    <InputFormUnit
      :title="blockNumber.title"
      :getter="getSelectFormValue"
      :setter="setSelectFormValue"
      :options="blockNumber.options"
      :propertyName="blockNumber.propertyName"
      :required="blockNumber.required"
      placeholder="町域を選択してください"
      :disabled="blockNumber.disabled"
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
        required: false,
        propertyName: "prefecture",
        value: null,
        validationState: false,
        options: [],
      },
      city: {
        title: "市区町村",
        required: false,
        propertyName: "city",
        value: null,
        validationState: false,
        options: [],
        disabled: true,
      },
      town: {
        title: "町域",
        required: false,
        propertyName: "town",
        value: null,
        validationState: false,
        options: [],
        disabled: true,
      },
      blockNumber: {
        title: "番地",
        required: false,
        propertyName: "blockNumber",
        value: null,
        validationState: false,
        options: [],
        disabled: true,
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
    fetchPrefecture() {
      this.$axios
        .get("http://geoapi.heartrails.com/api/json?method=getPrefectures")
        .then((res) => {
          var prefectureArr = res.data.response.prefecture;
          prefectureArr.forEach((pref, index) => {
            this.prefecture.options.push({ id: index, name: pref });
          });
          this.prefecture.options.unshift({ id: null, name: "未選択" });
        });
    },
    fetchCity(prefecture) {
      this.city.options = [];
      this.town.options = [];
      this.$axios
        .get(
          `http://geoapi.heartrails.com/api/json?method=getCities&prefecture=${prefecture}`
        )
        .then((res) => {
          var cityArr = res.data.response.location;
          cityArr.forEach((city) => {
            this.city.options.push({ text: city.city_kana, value: city.city });
          });
        });
    },
    fetchTown(city) {
      this.town.options = [];
      this.$axios
        .get(
          `http://geoapi.heartrails.com/api/json?method=getTowns&city=${city}`
        )
        .then((res) => {
          if (!res.data.response.error) {
            var townArr = res.data.response.location;
            townArr.forEach((town) => {
              if (town.city == this.city.value)
                this.town.options.push({
                  text: town.town_kana,
                  value: town.town,
                });
            });
          }
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
        this.city.disabled = false;
        var pref = this.prefecture.options[value + 1].name;
        this.fetchCity(pref);
      } else {
        this.city.disabled = true;
        this.city.options = [];
      }
      this.city.value = "";
    },
    "city.value"(value) {
      if (value != "") {
        this.town.disabled = false;
        this.fetchTown(value);
      } else {
        this.town.disabled = true;
        this.town.options = [];
      }
      this.town.value = "";
    },
    "town.value"(value) {
      if (value != "") {
        this.blockNumber.disabled = false;
      } else {
        this.blockNumber.disabled = true;
      }
      this.blockNumber.value = "";
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