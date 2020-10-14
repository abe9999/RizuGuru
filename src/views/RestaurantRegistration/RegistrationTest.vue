<template>
  <section v-if="loading">
    <Loading />
  </section>
  <section class="wrapper" v-else-if="!loading">
    <b-container v-if="!isConfirm">
      <AlertToast />
      <b-row>
        <b-col>
          <Headline headline="店舗登録" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <SubHead subHead="店舗情報" />
        </b-col>
      </b-row>
      <div class="suggest">
        <div id="hidden-map"></div>
        <div class="search-button" @click="searchButtonAction">
          店名から住所を検索
        </div>
        <b-list-group v-if="showSuggest" class="suggest-list">
          <b-list-group-item @click="closeSuggest"
            >× リストを閉じる</b-list-group-item
          >
          <b-list-group-item
            v-for="(suggest, index) in suggestList"
            :key="index"
            @click="setAddress(index)"
          >
            {{ suggest.name }}<br />{{ suggest.address.join(" ") }}
          </b-list-group-item>
        </b-list-group>
      </div>
      <RegistrationForm
        :formList="formList"
        :formValueGetter="getFormListValue"
        :formValueSetter="setFormListValue"
        :formValidationStateSetter="setValidationState"
        :tagStateSwitcher="tagStateSwitcher"
      />
      <Button message="確認画面に進む" :action="confirmButtonAction" />
    </b-container>
    <div v-else>
      <Headline headline="店舗登録入力確認" />
      <SubHead subHead="以下の内容で登録してよろしいですか？" />
      <table class="resultTable">
        <tr v-for="(col, index) in confirmList" :key="index">
          <td>{{ col.key }}</td>
          <td>{{ col.value }}</td>
        </tr>
      </table>
      <Button message="入力画面に戻る" :action="confirmButtonAction" />
      <Button message="登録" :action="submitButtonAction" />
    </div>
  </section>
</template>

<script>
/* eslint-disable no-undef */
import Enumerable from "linq";
import { getGenresList } from "@/plugins/getGenresList.js";
import { getTagsList } from "@/plugins/getTagsList.js";
import { getStation } from "@/plugins/getStation.js";
import { getCoord } from "@/plugins/getCoord.js";
import { getGeoDistance } from "@/plugins/getGeoDistance.js";
import { addRestaurant } from "@/plugins/addRestaurant.js";
import { leaveGuard } from "@/plugins/leaveGuard.js";
import Loading from "@/components/Atoms/Loading.vue";
import Button from "@/components/Atoms/Button.vue";
import Headline from "@/components/Molecules/Headline.vue";
import SubHead from "@/components/Molecules/SubHead.vue";
import AlertToast from "@/components/Molecules/AlertToast.vue";
import RegistrationForm from "@/components/Templates/RestaurantRegistration/RegistrationForm.vue";

export default {
  components: {
    Loading,
    Headline,
    SubHead,
    RegistrationForm,
    Button,
    AlertToast,
  },
  mixins: [leaveGuard],
  data() {
    return {
      loading: true,
      isConfirm: false,
      formList: {
        name: {
          type: "text",
          title: "店名",
          cautionMessage: "",
          required: true,
          propertyName: "name",
          placeholder: "リズグル食堂",
          value: "",
          validationState: false,
        },
        nameKana: {
          type: "text",
          title: "店名(カナ)",
          required: true,
          propertyName: "nameKana",
          cautionMessage: "※全角カタカナ",
          placeholder: "リズグルショクドウ",
          value: "",
          validationState: false,
        },
        phoneNumber: {
          type: "text",
          title: "電話番号",
          required: true,
          propertyName: "phoneNumber",
          cautionMessage: "半角数字＋ハイフン",
          placeholder: "03-5919-1033",
          value: "",
          validationState: false,
        },
        address: {
          type: "text",
          title: "住所(都道府県・市区町村・番地)",
          required: true,
          propertyName: "address",
          placeholder: "東京都新宿区四谷2-4-1",
          value: "",
          validationState: false,
        },
        buildingName: {
          type: "text",
          title: "住所(建物名・階数)",
          required: false,
          propertyName: "buildingName",
          placeholder: "ACN四谷ビル6F",
          value: "",
        },
        openingHours: {
          type: "text",
          title: "営業時間",
          required: true,
          propertyName: "openingHours",
          placeholder: "10:45〜15:30  17:30〜21:00",
          value: "",
          validationState: false,
        },
        regularHoliday: {
          type: "text",
          title: "定休日",
          required: true,
          propertyName: "regularHoliday",
          placeholder: "土・日・祝",
          value: "",
          validationState: false,
        },
        paymentMethod: {
          type: "text",
          title: "支払方法",
          required: true,
          propertyName: "paymentMethod",
          placeholder: "現金、クレジットカード",
          value: "",
        },
        homePage: {
          type: "text",
          title: "ホームページ",
          required: false,
          propertyName: "homePage",
          placeholder: "https://rizuguru.jp/",
          value: "",
        },
        blog: {
          type: "text",
          title: "ブログ",
          required: false,
          propertyName: "blog",
          placeholder: "https://rizuguru.blog/",
          value: "",
        },
        twitter: {
          type: "text",
          title: "Twitter",
          required: false,
          propertyName: "twitter",
          placeholder: "https://twitter.com/rizuguru",
          value: "",
        },
        facebook: {
          type: "text",
          title: "Facebook",
          required: false,
          propertyName: "facebook",
          placeholder: "https://www.facebook.com/rizuguru",
          value: "",
        },
        instagram: {
          type: "text",
          title: "Instagram",
          required: false,
          propertyName: "instagram",
          placeholder: "https://instagram.com/rizuguru",
          value: "",
        },
        genre1: {
          type: "select",
          title: "ジャンル1",
          required: true,
          propertyName: "genre1",
          value: null,
          validationState: false,
          options: [],
        },
        genre2: {
          type: "select",
          title: "ジャンル2",
          required: false,
          propertyName: "genre2",
          value: null,
          options: [],
        },
        genre3: {
          type: "select",
          title: "ジャンル3",
          required: false,
          propertyName: "genre3",
          value: null,
          options: [],
        },
        tagList: {
          type: "tag",
          title: "タグ",
          propertyName: "tagList",
          required: false,
          value: [],
        },
      },
      genreOptions: [],
      confirmList: [],
      fields: [],
      accesses: [],
      stations: [],
      coord: {},
      stationCoords: [],
      suggestList: [],
      showSuggest: false,
    };
  },
  mounted() {
    getGenresList().then((res) => {
      res.unshift({ id: null, name: "未選択" });
      this.formList.genre1.options = res;
      this.formList.genre2.options = res;
      this.formList.genre3.options = res;
      getTagsList().then((res) => {
        this.formList.tagList.value = res
          .filter((e) => e.id > 10)
          .map((e) => {
            e.state = false;
            return e;
          });
      });
      this.loading = false;
    });
  },
  methods: {
    getFormListValue(propertyName) {
      return this.formList[`${propertyName}`].value;
    },
    setFormListValue(obj) {
      this.formList[`${obj.propertyName}`].value = obj.value;
    },
    setValidationState(obj) {
      this.formList[`${obj.propertyName}`].validationState = obj.state;
    },
    tagStateSwitcher(index) {
      this.formList.tagList.value[index].state = !this.formList.tagList.value[
        index
      ].state;
    },
    validateFormValue() {
      // 必須項目に未入力が含まれているか確認
      var formValueArr = Enumerable.from(this.formList)
        .where((x) => x.value.required == true)
        .select((x) => x.value.value)
        .toArray();
      return !formValueArr.includes("") ? true : false;
    },
    validateFormState() {
      // 不正な入力の有無を確認
      var formValidateArr = Enumerable.from(this.formList)
        .where((x) => x.value.required == true)
        .select((x) => x.value.validationState)
        .toArray();
      return !formValidateArr.includes(false) ? true : false;
    },
    async fetchDistance(origin, dest) {
      return new Promise((resolve, reject) => {
        let response;
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: origin,
            destinations: [dest],
            travelMode: "WALKING",
          },
          function (resp, status) {
            if (status !== google.maps.DistanceMatrixStatus.OK) {
              response = reject(status);
            } else {
              response = resolve(resp);
            }
          }
        );
        return response;
      });
    },
    async getAddress(address) {
      return new Promise((resolve, reject) => {
        let response;
        var map = new google.maps.Map(document.getElementById("hidden-map"), {
          center: { lat: 0, lng: 0 },
        });
        var request = {
          query: address,
        };
        var service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
        function callback(results, status) {
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
            response = reject(status);
          } else {
            response = resolve(results);
          }
        }
        return response;
      });
    },
    searchButtonAction() {
      if (this.formList.name.value == "") {
        alert("店名を入力してください。");
        return;
      }
      this.getAddress(this.formList.name.value).then((res) => {
        this.suggestList = res.map((e) => {
          var address = e.formatted_address.split(" ");
          address = address.splice(1, address.length - 1);
          return {
            name: e.name,
            address: address,
          };
        });
        this.showSuggest = true;
      });
    },
    closeSuggest() {
      this.showSuggest = false;
    },
    setAddress(index) {
      this.formList.address.value = this.suggestList[index].address[0];
      this.formList.buildingName.value = this.suggestList[index].address
        .splice(1, this.suggestList[index].address.length - 1)
        .join(" ");
      this.showSuggest = false;
    },
    confirmButtonAction() {
      if (this.validateFormValue()) {
        if (this.validateFormState()) {
          if (!this.isConfirm) {
            var formResult = Object.entries(this.formList).map((x) => x[1]);
            formResult.forEach((x) => {
              switch (x.propertyName) {
                case "prefecture":
                case "genre1":
                case "genre2":
                case "genre3":
                  this.confirmList.push({
                    key: x.title,
                    value: x.options.find((y) => y.id == x.value).name,
                  });
                  break;
                case "tagList":
                  this.confirmList.push({
                    key: x.title,
                    value: x.value
                      .filter((y) => y.state == true)
                      .map((z) => z.tagContent)
                      .join("・"),
                  });
                  break;
                default:
                  this.confirmList.push({ key: x.title, value: x.value });
                  break;
              }
            });
          } else {
            // 確認画面から入力画面への遷移の場合、結果表示テーブル用の変数を空に
            this.confirmList = [];
          }
          // 表示コンポーネントの切り替え
          this.isConfirm = !this.isConfirm;
        } else {
          this.makeToast("danger", "不正な入力/未選択の項目があります");
        }
      } else {
        this.makeToast("danger", "必須項目が未入力/未選択です");
      }
    },
    submitButtonAction() {
      // 登録処理を入れる
      this.loading = true;
      // formListを配列化
      var formResult = Object.entries(this.formList).map((x) => x[1]);

      // ジャンルのIDを取得（未選択は除く）
      var genreIdArr = formResult
        .filter((x) => x.propertyName.includes("genre"))
        .filter((x) => x.value != null)
        .map((x) => x.value);

      // 選択したタグのIDを取得
      var tagIdArr = formResult
        .find((x) => x.propertyName.includes("tagList"))
        .value.filter((x) => x.state == true)
        .map((x) => x.id);

      // ホームページなどのリンクを取得
      var linkGenreIdArr = [];
      var urls = [];
      formResult.forEach((x) => {
        if (x.value) {
          switch (x.propertyName) {
            case "homePage":
              linkGenreIdArr.push(1);
              urls.push(x.value);
              break;
            case "blog":
              linkGenreIdArr.push(2);
              urls.push(x.value);
              break;
            case "twitter":
              linkGenreIdArr.push(3);
              urls.push(x.value);
              break;
            case "facebook":
              linkGenreIdArr.push(4);
              urls.push(x.value);
              break;
            case "instagram":
              linkGenreIdArr.push(5);
              urls.push(x.value);
              break;
          }
        }
      });

      getCoord(this.formList.address.value).then((res) => {
        this.coord = res.results[0].geometry.location;
        getStation("").then((res) => {
          this.stations = res;
          for (var i = 0; i < this.stations.length; i++) {
            this.stations[i].distance = getGeoDistance(
              this.coord.lat,
              this.coord.lng,
              this.stations[i].latitude,
              this.stations[i].longitude,
              0
            );
          }

          this.stations = Enumerable.from(this.stations)
            .select((x) => x)
            .orderBy((x) => x.distance)
            .toArray();

          if (this.stations[0].distance > 800) {
            this.stations = this.stations.slice(0, 1);
          } else {
            this.stations = Enumerable.from(this.stations)
              .where((x) => x.distance <= 800)
              .take(5)
              .toArray();
          }

          for (var j = 0; j < this.stations.length; j++) {
            this.stationCoords.push(
              `${this.stations[j].latitude},${this.stations[j].longitude}`
            );
          }

          this.fetchDistance(
            this.stationCoords,
            this.formList.address.value
          ).then((res) => {
            for (var i = 0; i < res.rows.length; i++) {
              this.accesses.push(
                this.stations[i].name +
                  "駅から徒歩" +
                  res.rows[i].elements[0].duration.text
              );
            }

            var postData = {
              Name: this.formList.name.value,
              NameKana: this.formList.nameKana.value,
              Address: `${this.formList.address.value} ${this.formList.buildingName.value}`,
              Latitude: this.coord.lat,
              Longitude: this.coord.lng,
              Access: this.accesses.join(" "),
              PhoneNumber: this.formList.phoneNumber.value,
              OpeningHours: this.formList.openingHours.value,
              RegularHoliday: this.formList.regularHoliday.value,
              PaymentMethod: this.formList.paymentMethod.value,
              GenreId: genreIdArr,
              Url: urls,
              LinkGenreId: linkGenreIdArr,
              TagId: tagIdArr,
            };

            addRestaurant(postData)
              .then(this.$router.push("/RestaurantRegistration/Complete"))
              .catch((err) => alert(err));
          });
        });
      });
    },
    makeToast(variant, message) {
      this.$bvToast.toast(message, {
        title: "注意！",
        variant: variant,
        solid: true,
      });
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
.suggest {
  margin-bottom: 10px;
}
.suggest-list {
  cursor: pointer;
}
#map {
  display: none;
}
.search-button {
  padding: 5px 20px;
  cursor: pointer;
  color: white;
  font-size: large;
  background-color: red;
  border-radius: 5px;
  display: inline-block;
  text-align: center;
  margin-bottom: 10px;
}
.resultTable {
  width: 90%;
  margin: 0 auto;
}
.resultTable td {
  padding: 5px 10px;
}
.resultTable tr:nth-child(2n) {
  background-color: #f6f6f6;
}
.resultTable tr:nth-child(2n-1) {
  background-color: #b8e0be;
}
</style>